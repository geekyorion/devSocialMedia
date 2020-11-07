import React from 'react';

export default function Footer() {
    return (
        <>
            <footer className="bg-dark text-white mt-4 p-3 text-center">
                Copyright &copy; {new Date().getFullYear()} Dev Social Media
            </footer>
        </>
    );
}
