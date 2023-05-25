export default function Table({ data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date/Time</th>
          <th>Temp</th>
          <th>Humidity</th>
          <th>BPM</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.entry_id}>
            <td>{item.entry_id}</td>
            <td>{item.created_at}</td>
            <td>{item.field1}</td>
            <td>{item.field2}</td>
            <td>{item.field3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
