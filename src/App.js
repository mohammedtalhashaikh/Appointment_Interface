import { BiCalendar } from "react-icons/bi";
import { useState, useCallback, useEffect } from "react";
import AddAppointment from "./components/AddAppointment";
import Appointments from "./components/Appointments";
import Search from "./components/Search";
import "./index.css";

function App() {
  let [appointmentList, setAppointmentList] = useState([]);

  const [queryString, setQueryString] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(queryString.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(queryString.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(queryString.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : order;
    });
  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setAppointmentList(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <AddAppointment
        onSendAppointment={(newAppointment) =>
          setAppointmentList([...appointmentList, newAppointment])
        }
        lastId={appointmentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
      <Search
        queryString={queryString}
        onQueryChange={(updatedQuery) => setQueryString(updatedQuery)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
        orderBy={orderBy}
        onOrderByChange={(myOrder) => setOrderBy(myOrder)}
      />
      <ul className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => (
          <Appointments
            key={appointment.id}
            appointment={appointment}
            deleteAppointment={(appointmentId) =>
              setAppointmentList(
                appointmentList.filter(
                  (appointment) => appointment.id !== appointmentId
                )
              )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
