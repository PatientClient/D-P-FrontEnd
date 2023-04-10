import { Message } from "../../components/dashboard/displayMessages";
import { Users } from "../../components/dashboard/users";
import { useDashBoard } from "../../hooks/dashboard/useDashBoard";

export function DashBoard() {
  const { filterData, users, setUsers } = useDashBoard()
  if (!users) {
    return <h1>loading...</h1>
  }
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: '100vw' }}>
          <Users title={"not active users"} setData={setUsers} users={filterData("NotActive")} />
        </div>
        <div style={{ width: '100vw' }}>
          <Users title={"active In Progress users"} setData={setUsers} users={filterData("InProgress")} />
        </div>
        <div style={{ width: '100vw' }}>
          <Users title={" active users"} setData={setUsers} users={filterData("Active")} />
        </div>
        <div style={{ width: '100vw' }}>
          <h1>messages</h1>
          <Message />

        </div>
      </div>

    </>
  )

}