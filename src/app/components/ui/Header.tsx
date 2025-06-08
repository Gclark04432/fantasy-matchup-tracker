export const Header = () => {
  return (
    <header className='mx-auto mb-10 max-w-6xl'>
      <div className='flex items-center justify-between'>
        <h1 className='text-center text-3xl font-bold sm:text-left sm:text-4xl'>
          Fantasy Matchup Tracker
        </h1>
        <div className='flex items-center gap-2'>
          <span>Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>
    </header>
  );
};
