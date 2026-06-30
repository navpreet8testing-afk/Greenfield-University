# Animation & Interaction Design Specification
## Project: Higher Education College Website
### Design System Reference: Jeton Website Interaction Framework

This document outlines the animation, motion graphics, and interactive transition guidelines for the new **College Website**. The motion system is inspired by the modern, fluid, and high-impact scroll-driven behaviors of the Jeton landing page. The goal is to elevate standard academic web architecture into an immersive, premium, and highly engaging digital campus experience.

---

## 1. Design Principles & Motion Philosophy

To bridge the gap between financial tech fluency and premium academic professionalism, our motion system follows three core pillars:

* **Fluid Spatial Awareness:** Elements do not simply appear; they transition geographically within the page viewport using coordinated translation, scaling, and depth manipulation (Z-axis).
* **Deliberate Momentum (Ease-Out-Quint):** Motion must feel physics-based, with crisp acceleration and a smooth, prolonged deceleration phase (`cubic-bezier(0.23, 1, 0.32, 1)`).
* **Contextual Reveal:** Typography and layout sections expand dynamically based on user scroll position to reduce cognitive overload and encourage continuous exploration.

---

## 2. Global Core Interaction Framework

### A. The Floating Perspective Footer (Persistent Hub)
* **Inspiration:** Jeton's bottom sticky persistent pill navbar (`Personal | Business | Company`).
* **College Implementation:** A modern, floating navigation dock anchored at the bottom center of the viewport containing core student actions: `Explore Programs | Apply Now | Virtual Campus Tour`.
* **Behavior & Motion Specs:**
    * **Entrance:** Slides up from the absolute bottom (`translateY(100%)` to `translateY(0)`) with a `0.8s` delay after page initialization.
    * **Hover States:** When a category is hovered, a soft glassmorphism pill background expands to highlight the active tab using an elastic transition (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`).
    * **Scroll Adaptation:** Shrinks slightly in scale (`scale(0.95)`) and increases transparency (`opacity: 0.85`) during high-velocity scrolling to prevent content obstruction, snapping back to full fidelity upon scroll halt.

### B. Viewport Scroll-Driven Scale & Morph
* **Inspiration:** The central abstract organic fluid structures and device framing scaling smoothly up/down during page scroll.
* **College Implementation:** Main campus gateway visuals, departmental structural diagrams, and student life hero collages dynamically scale and focus as they enter the screen frame.
* **CSS/GSAP Key Properties:**
    ```javascript
    gsap.to(".campus-hero-frame", {
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      },
      scale: 1.15,
      borderRadius: "24px",
      transformOrigin: "center center",
      ease: "power2.out"
    });
    ```

---

## 3. Section-by-Section Animation Mapping

### Section 1: Institutional Hero & Kinetic Typography
* **Visual Structure:** A bold, high-contrast headline acts as the focal anchor point.
* **Animation Behavior:** Inspired by Jeton's sequential text changes (`Add -> Send -> Exchange`). The college website will sequentially cycle through core institutional values or milestones.
* **Key Sequence:** * "Unify your **Ambition**" $\rightarrow$ *Morph/Slide Up* $\rightarrow$ "Unify your **Future**" $\rightarrow$ *Morph/Slide Up* $\rightarrow$ "Unify your **Impact**".
* **Transition Mechanics:** Masked overflow boundary box. The active word translates upwards by `-100%` while the incoming word fades from `opacity: 0` and rotates slightly around the X-axis (`rotateX(-45deg)`) to establish an authentic 3D turning cylinder illusion.

### Section 2: Departmental & Course Currency Swiper
* **Visual Structure:** Interactive grid cards displaying individual departments (Computer Applications, Commerce, Engineering).
* **Animation Behavior:** Jeton's multi-currency stacked card layout (`All Accounts -> Euro -> British Pound`).
* **College Implementation:** A multi-layered visual card deck showcasing Academic Degrees.
* **Interaction Design:** * Cards sit stacked tightly at a baseline index.
    * As the user scrolls or clicks through fields, cards cleanly fan out horizontally or shift in relative Z-depth (`translateZ`).
    * Hovering over an individual course card triggers a smooth expansion of internal grid details (e.g., Credit structure, Faculty ratio) via a clip-path revealing animation.

```
[ Academic Programs Header ]
       |
       v  (Scroll Trigger Active)
+---------------------------------------+
|  [ BCA / Computer Applications Card ]  |  <-- Elevated Depth (Z-index: 30)
+---------------------------------------+
    |  [ B.Com / Global Commerce Card ]  |   <-- Mid-Depth (Z-index: 20)
    +------------------------------------+
        |  [ B.Tech / Engineering Card ]   | <-- Base-Depth (Z-index: 10)
        +----------------------------------+
```

### Section 3: Student & Alumnus Testimonial Float
* **Visual Structure:** Staggered asynchronous testimonial masonry cards.
* **Animation Behavior:** Cards glide independently at slightly varying parallax speeds as the screen scrolls, mirroring Jeton’s clean client review grid.
* **Parallax Factors:**
    * *Column 1 (Left Aligned):* Parallax Scroll Factor: `0.05`
    * *Column 2 (Center Aligned):* Parallax Scroll Factor: `0.12`
    * *Column 3 (Right Aligned):* Parallax Scroll Factor: `0.08`
* **Hover Feedback:** On desktop pointer hover, an individual card halts its relative parallax delta, scales linearly by `scale(1.02)`, and casts a soft, diffused ambient light glow (`box-shadow: 0 20px 40px rgba(0,0,0,0.06)`).

---

## 4. Implementation Guidelines for Engineering Teams

To achieve the precise premium feel of the source animation material, engineers must follow these runtime constraints:

1.  **Hardware Acceleration Required:** Apply `will-change: transform, opacity;` strictly to layout components managed by scroll triggers (e.g., the perspective hero shapes and the persistent footer).
2.  **Scrubbing Latency Setup:** All ScrollTrigger configurations utilizing continuous animation interpolation must specify a `scrub` value strictly between `1.0` and `1.5` seconds. Avoid binary `true` scrubbing settings, which look mechanical and jarring.
3.  **Preventing Layout Flash (FOUC):** Set initial opacity visibility to `0` for all text reveal elements inside the target CSS declarations, passing control onto the initialization routine of the animation controller framework.
