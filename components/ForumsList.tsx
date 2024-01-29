import Forum from "./Forum";
export default function ForumList() {
  const ForumList = [
    {
      id: 1,
      name: "Pinned",
    },
    {
      id: 2,
      name: "Her Assistance",
    },
    {
      id: 3,
      name: "Her Creations",
    },
    {
      id: 4,
      name: "Her History",
    },
    {
      id: 5,
      name: "Her Life",
    },
    {
      id: 6,
      name: "Her Reading",
    },
  ];
  return (
    <div>
      {ForumList.map((forum) => (
        <Forum key={forum.id} forum={forum} />
      ))}
    </div>
  );
}
