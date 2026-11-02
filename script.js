/* ============================================================
   ATLAS — interactions
   Tanpa library. Perilaku utama punya fallback tanpa JS.
   ============================================================ */

(() => {
    "use strict";

    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    /* ---------- Jam lokal (WIB) ---------- */
    const clockEls = document.querySelectorAll("[data-clock]");
    if (clockEls.length) {
        let formatter;
        try {
            formatter = new Intl.DateTimeFormat("id-ID", {
                timeZone: "Asia/Jakarta",
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23",
            });
        } catch (error) {
            formatter = null;
        }

        const updateClock = () => {
            const now = new Date();
            let text;
            if (formatter) {
                text = formatter.format(now).replace(/\./g, ":");
            } else {
                text = `${String(now.getHours()).padStart(2, "0")}:${String(
                    now.getMinutes()
                ).padStart(2, "0")}`;
            }
            clockEls.forEach((el) => {
                el.textContent = `${text} WIB`;
            });
        };

        updateClock();
        window.setInterval(updateClock, 30000);
    }

    /* ---------- Menu seluler (dropdown) ---------- */
    const menu = document.getElementById("menu");
    const menuOpen = document.querySelector("[data-menu-open]");
    let menuIsOpen = false;

    const setMenu = (open) => {
        if (!menu || !menuOpen) return;
        menuIsOpen = open;
        menu.hidden = !open;
        menuOpen.setAttribute("aria-expanded", String(open));
        menuOpen.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
        if (open) {
            const firstLink = menu.querySelector("a");
            if (firstLink) firstLink.focus({ preventScroll: true });
        }
    };

    if (menu && menuOpen) {
        menuOpen.addEventListener("click", () => setMenu(!menuIsOpen));

        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenu(false));
        });

        document.addEventListener("click", (event) => {
            if (!menuIsOpen) return;
            if (menu.contains(event.target) || menuOpen.contains(event.target)) return;
            setMenu(false);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape" || !menuIsOpen) return;
            setMenu(false);
            menuOpen.focus();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900 && menuIsOpen) setMenu(false);
        });
    }

    /* ---------- Reveal saat scroll ---------- */
    const revealEls = document.querySelectorAll("[data-reveal]");

    if (revealEls.length) {
        if (reduceMotion.matches || !("IntersectionObserver" in window)) {
            revealEls.forEach((el) => el.classList.add("is-visible"));
        } else {
            const revealObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            revealObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
            );

            revealEls.forEach((el) => revealObserver.observe(el));
        }
    }

    /* ---------- Progress baca + tombol ke atas ---------- */
    const progressBar = document.querySelector(".progress span");
    const toTop = document.querySelector("[data-to-top]");
    let scrollQueued = false;

    const updateScrollUI = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

        if (progressBar) {
            const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;
            progressBar.style.transform = `scaleX(${Math.min(
                1,
                Math.max(0, ratio)
            )})`;
        }

        if (toTop) {
            toTop.classList.toggle("is-on", scrollTop > 480);
        }

        scrollQueued = false;
    };

    const onScroll = () => {
        if (!scrollQueued) {
            scrollQueued = true;
            window.requestAnimationFrame(updateScrollUI);
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollUI();

    if (toTop) {
        toTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: reduceMotion.matches ? "auto" : "smooth",
            });
        });
    }

    /* ---------- Section aktif di navigasi ---------- */
    const chapterEls = document.querySelectorAll("[data-chapter]");
    const navLinks = Array.from(document.querySelectorAll("[data-nav]"));

    if (chapterEls.length && navLinks.length && "IntersectionObserver" in window) {
        const linkById = new Map(
            navLinks.map((link) => [link.dataset.nav, link])
        );

        const setActive = (id) => {
            navLinks.forEach((link) => {
                const isActive = link.dataset.nav === id;
                link.classList.toggle("is-active", isActive);
                if (isActive) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        };

        const chapterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && linkById.has(entry.target.id)) {
                        setActive(entry.target.id);
                    }
                });
            },
            { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
        );

        chapterEls.forEach((section) => chapterObserver.observe(section));
    }

    /* ---------- Preview gambar mengikuti kursor ---------- */
    const preview = document.querySelector(".cursor-preview");
    const previewImg = preview ? preview.querySelector("img") : null;
    const previewItems = document.querySelectorAll(".index-item[data-preview]");

    if (
        preview &&
        previewImg &&
        previewItems.length &&
        finePointer.matches &&
        !reduceMotion.matches
    ) {
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let hasPosition = false;
        let animationId = null;

        const renderPreview = () => {
            currentX += (targetX - currentX) * 0.18;
            currentY += (targetY - currentY) * 0.18;
            preview.style.transform = `translate3d(${currentX + 18}px, ${currentY}px, 0) translateY(-50%)`;

            if (
                Math.abs(targetX - currentX) > 0.2 ||
                Math.abs(targetY - currentY) > 0.2
            ) {
                animationId = window.requestAnimationFrame(renderPreview);
            } else {
                animationId = null;
            }
        };

        const startPreview = () => {
            if (!animationId) {
                animationId = window.requestAnimationFrame(renderPreview);
            }
        };

        previewItems.forEach((item) => {
            item.addEventListener("mouseenter", (event) => {
                if (item.dataset.preview) {
                    previewImg.src = item.dataset.preview;
                }
                if (!hasPosition) {
                    targetX = event.clientX;
                    targetY = event.clientY;
                    currentX = targetX;
                    currentY = targetY;
                    hasPosition = true;
                }
                preview.classList.add("is-on");
                startPreview();
            });

            item.addEventListener("mousemove", (event) => {
                targetX = event.clientX;
                targetY = event.clientY;
                startPreview();
            });

            item.addEventListener("mouseleave", () => {
                preview.classList.remove("is-on");
            });
        });
    }

    /* ---------- Document viewer ---------- */
    const viewer = document.getElementById("viewer");
    const viewerImg = viewer ? viewer.querySelector(".viewer-img") : null;
    const viewerCaption = viewer
        ? viewer.querySelector("[data-viewer-caption]")
        : null;
    const viewerCount = viewer
        ? viewer.querySelector("[data-viewer-count]")
        : null;
    const viewerPrev = viewer
        ? viewer.querySelector("[data-viewer-prev]")
        : null;
    const viewerNext = viewer
        ? viewer.querySelector("[data-viewer-next]")
        : null;
    const viewerClose = viewer
        ? viewer.querySelector("[data-viewer-close]")
        : null;
    const viewerTriggers = Array.from(
        document.querySelectorAll("[data-viewer]")
    );

    if (viewer && viewerImg && viewerTriggers.length) {
        let currentIndex = 0;

        const pad = (value) => String(value).padStart(2, "0");

        const renderViewer = () => {
            const trigger = viewerTriggers[currentIndex];
            const thumb = trigger.querySelector("img");
            const full = trigger.getAttribute("href") || trigger.dataset.full;
            const alt =
                trigger.dataset.alt || (thumb ? thumb.alt : "") || "Dokumen";
            const caption =
                trigger.dataset.caption || (thumb ? thumb.alt : "") || alt;

            if (full) viewerImg.src = full;
            viewerImg.alt = alt;
            if (viewerCaption) viewerCaption.textContent = caption;
            if (viewerCount) {
                viewerCount.textContent = `${pad(currentIndex + 1)} / ${pad(
                    viewerTriggers.length
                )}`;
            }

            const single = viewerTriggers.length < 2;
            if (viewerPrev) viewerPrev.hidden = single;
            if (viewerNext) viewerNext.hidden = single;
        };

        const openViewer = (index) => {
            currentIndex = index;
            renderViewer();
            if (typeof viewer.showModal === "function") {
                viewer.showModal();
            } else {
                viewer.setAttribute("open", "");
            }
            document.body.classList.add("is-locked");
        };

        const closeViewer = () => {
            if (typeof viewer.close === "function") {
                viewer.close();
            } else {
                viewer.removeAttribute("open");
            }
            document.body.classList.remove("is-locked");
        };

        const stepViewer = (direction) => {
            if (viewerTriggers.length < 2) return;
            currentIndex =
                (currentIndex + direction + viewerTriggers.length) %
                viewerTriggers.length;
            renderViewer();
        };

        viewerTriggers.forEach((trigger, index) => {
            trigger.addEventListener("click", (event) => {
                if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                ) {
                    return;
                }
                event.preventDefault();
                openViewer(index);
            });
        });

        if (viewerClose) viewerClose.addEventListener("click", closeViewer);
        if (viewerPrev) {
            viewerPrev.addEventListener("click", () => stepViewer(-1));
        }
        if (viewerNext) {
            viewerNext.addEventListener("click", () => stepViewer(1));
        }

        viewer.addEventListener("click", (event) => {
            if (event.target === viewer) closeViewer();
        });

        viewer.addEventListener("close", () => {
            document.body.classList.remove("is-locked");
            viewerImg.removeAttribute("src");
        });

        viewer.addEventListener("cancel", () => {
            document.body.classList.remove("is-locked");
        });

        document.addEventListener("keydown", (event) => {
            if (!viewer.open) return;
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                stepViewer(-1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                stepViewer(1);
            }
        });
    }

    /* ---------- Salin email ---------- */
    const copyBtn = document.querySelector("[data-copy]");
    if (copyBtn) {
        const label = copyBtn.querySelector(".copy-label") || copyBtn;
        const originalLabel = label.textContent;
        let resetTimer = null;

        const markCopied = (success) => {
            label.textContent = success ? "Tersalin" : "Gagal menyalin";
            copyBtn.classList.toggle("is-copied", success);
            if (resetTimer) window.clearTimeout(resetTimer);
            resetTimer = window.setTimeout(() => {
                label.textContent = originalLabel;
                copyBtn.classList.remove("is-copied");
            }, 2200);
        };

        const legacyCopy = (text) => {
            const area = document.createElement("textarea");
            area.value = text;
            area.setAttribute("readonly", "");
            area.style.position = "fixed";
            area.style.top = "0";
            area.style.left = "0";
            area.style.fontSize = "16px";
            area.style.opacity = "0";
            document.body.appendChild(area);
            area.focus();
            area.select();
            area.setSelectionRange(0, area.value.length);
            let success = false;
            try {
                success = document.execCommand("copy");
            } catch (error) {
                success = false;
            }
            area.remove();
            return success;
        };

        copyBtn.addEventListener("click", async () => {
            const text = copyBtn.dataset.copy || "";
            if (!text) return;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                    await navigator.clipboard.writeText(text);
                    markCopied(true);
                    return;
                } catch (error) {
                    // jatuh ke cara lama di bawah
                }
            }

            markCopied(legacyCopy(text));
        });
    }

    // Pastikan kelas .js selalu ada meski inline script gagal.
    root.classList.add("js");
})();
