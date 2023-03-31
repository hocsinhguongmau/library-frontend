import { Link, NavLink } from 'react-router-dom'
import { RxCaretDown } from 'react-icons/rx'

import { NavItem } from '@/types/Common'

export default function NavLinkItem({ title, url, child }: NavItem) {
  return (
    <li className="relative z-10 w-full p-4 group max-w-[20%]">
      <NavLink
        to={url}
        className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
        aria-label={title}
        aria-haspopup={child ? true : undefined}>
        {title}
      </NavLink>
      {child && (
        <div
          className="absolute left-0 hidden w-full bg-primary top-full group-hover:block"
          role="menu"
          aria-label={`${title} submenu`}>
          <RxCaretDown className="absolute text-2xl -translate-x-1/2 text-primary bottom-full left-1/2" />
          <ul>
            {child.map((childNav) => (
              <li className="" key={childNav.title}>
                <Link
                  to={childNav.url}
                  className="block px-4 py-2 text-white capitalize hover:bg-secondary hover:text-white"
                  role="menuitem">
                  {childNav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}
