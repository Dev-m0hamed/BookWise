import { Session } from "next-auth"

function Header({session}: {session: Session}) {
  return (
      <header className="flex lg:items-end items-start justify-between lg:flex-row flex-col gap-5 sm:mb-10 mb-5">
          <div>
              <h2 className="text-2xl font-semibold text-dark-400">
                  {session.user?.name}
              </h2>
              <p className="text-slate-500">
                  Monitor all of your users and books here
              </p>
          </div>
          <p></p>
    </header>
  );
}

export default Header
