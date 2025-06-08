export const Header = () => {
          return (
          <header className="max-w-6xl mx-auto mb-10">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
                Fantasy Matchup Tracker
              </h1>
              <div className="flex items-center gap-2">
                <span>Dark Mode</span>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
          </header>
          )
}