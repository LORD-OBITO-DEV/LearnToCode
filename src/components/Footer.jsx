import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 p-4 text-center mt-8">
      © {new Date().getFullYear()} LearnToCode • Apprends JS, Python, HTML, CSS et plus • <a href="/" className="text-primary underline">Notre site</a>
    </footer>
  );
}

export default Footer;
