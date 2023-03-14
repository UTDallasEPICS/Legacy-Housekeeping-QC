import { Scroll } from "../src/components";

const teamMembers = ({ members }) => {
  return (
    <div>
      <Scroll members={members} />
    </div>
  );
};

export default teamMembers;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/member/members");
  const data = await res.json();

  return {
    props: {
      members: data,
    },
  };
}
