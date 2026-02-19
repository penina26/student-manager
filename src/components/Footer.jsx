import React from "react";

function Footer() {
    return (
        <footer className="bg-dark text-light py-3 mt-auto">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
                <small className="mb-0">
                    &copy; {new Date().getFullYear()} StudentMS. All rights reserved.
                </small>
                <small className="text-secondary mb-0">Built with React + Bootstrap</small>
            </div>
        </footer>
    );
}

export default Footer;
