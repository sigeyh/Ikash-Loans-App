(function() {
    "use strict";
    const i = "__vercel_toolbar"
      , n = () => {
        var e;
        return (e = document.cookie.split("; ").find(r => r.startsWith(`${i}=`))) == null ? void 0 : e.split("=")[1]
    }
      , c = () => {
        if (document.querySelector('script[src$="/_next-live/feedback/feedback.js"]'))
            return;
        const e = document.createElement("script");
        e.src = "https://vercel.live/_next-live/feedback/feedback.js",
        e.async = !0,
        e.setAttribute("data-explicit-opt-in", "true"),
        e.setAttribute("data-cookie-opt-in", "true"),
        document.head.appendChild(e)
    }
      , t = e => {
        window.origin === e.origin && e.data === "inject_vercel_feedback_script" && n() === "2" && (c(),
        window.removeEventListener("message", t))
    }
    ;
    window.addEventListener("message", t)
}
)();
