import Link from "next/link";

const header = () => {
  return (
    <div>
      <header>
        <h2>Admin Dashboard</h2>
      </header>
      <nav>
        <ul>
          <li>
            <Link href={"/performance"} passHref>
              Performance
            </Link>
          </li>
          <li>
            <Link href={"/inspections"} passHref>
              Inspections
            </Link>
          </li>
          <li>
            <Link href={"/schedules"} passHref>
              Schedules
            </Link>
          </li>
          <li>
            <Link href={"/teamMembers"} passHref>
              Team Members
            </Link>
          </li>
          <li>
            <Link href={"/rooms"} passHref>
              Rooms
            </Link>
          </li>
          <li>
            <Link href={"/userName"} passHref>
              User Name
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default header;
