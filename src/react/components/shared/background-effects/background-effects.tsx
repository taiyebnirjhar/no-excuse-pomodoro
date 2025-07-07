export default function BackgroundEffects() {
  return (
    <>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 dark:opacity-20" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-30 animate-blob" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-400 dark:bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-400 dark:bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-30 animate-blob animation-delay-4000" />
    </>
  );
}
