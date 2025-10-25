export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-6">
      &copy; {new Date().getFullYear()} LearnToCode. Tous droits réservés.
    </footer>
  );
}