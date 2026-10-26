window.authBridge = {
    completeDemoLogin: function () {
        window.parent.postMessage(
            { type: "atelier:demo-login-complete" },
            window.location.origin
        );
    }
};