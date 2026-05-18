// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <header className="border-b">
//       <div className="w-full px-4 sm:px-6 py-4 flex flex-col gap-4 md:h-16 md:flex-row md:items-center md:justify-between">
//         <div className="flex items-center justify-between">
//           <Link
//             href="/"
//             className="text-xl font-bold"
//           >
//             WorshipFlow
//           </Link>
//         </div>

//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:justify-end flex-1">
//           <nav className="flex items-center gap-5 text-sm font-medium">
//             <Link
//               href="/"
//               className="hover:opacity-70 transition"
//             >
//               Setlists
//             </Link>

//             <Link
//               href="/songs"
//               className="hover:opacity-70 transition"
//             >
//               Songs
//             </Link>
//           </nav>

//           <div className="flex flex-wrap items-center gap-3">
//             <Link
//               href="/songs/new"
//               className="border px-4 py-2 rounded-md hover:bg-accent transition text-sm"
//             >
//               Add Song
//             </Link>

//             <Link
//               href="/setlists/new"
//               className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition text-sm"
//             >
//               Add Setlist
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import Link from "next/link";

import {
  Menu,
  Plus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          WorshipFlow
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link
              href="/"
              className="hover:opacity-70 transition"
            >
              Setlists
            </Link>

            <Link
              href="/songs"
              className="hover:opacity-70 transition"
            >
              Songs
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/songs/new"
              className="border px-4 py-2 rounded-md hover:bg-accent transition text-sm"
            >
              Add Song
            </Link>

            <Link
              href="/setlists/new"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition text-sm"
            >
              Add Setlist
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="border rounded-md p-2"
            >
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56"
            >
              <DropdownMenuItem asChild>
                <Link href="/">
                  Setlists
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/songs">
                  Songs
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/songs/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Song
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/setlists/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Setlist
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}