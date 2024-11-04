import { User } from "../types";

interface RoomProps {
  users: User[] | undefined;
}

export default function UserTable({ users }: RoomProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Preferencias</th>
            <th>Formatos preferidos</th>
            <th>Lista de anime</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user.avatar} alt="Avatar" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </div>
              </td>
              <td>{user.animePreferences}</td>
              <td>{user.animeFormat}</td>
              <th>
                {user.animeFileList ? (
                  user.animeFileList
                ) : (
                  <a href={user.animeList}>Ver lista</a>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
