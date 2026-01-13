import { adminSideBarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10">
      <div>
        <div className="flex flex-row items-center gap-2 border-b border-dashed border-primary-admin/20 pb-10 max-md:justify-center">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            height={37}
            width={37}
          />
          <h1 className="text-2xl font-semibold text-primary-admin max-md:hidden">
            BookWise
          </h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected = false;
            return <Link href={link.route} key={link.route}></Link>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
