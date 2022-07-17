import axios from "axios";

export default function ListCard({ listOf }) {

    // console.log(listOf, `--------`);
    const handleClick = async (e, id, status) => {
        e.preventDefault()
        try {
            if (status == false) {
                const response = await axios.patch(`http://localhost:3001/todoroute/todos/${id}`, {
                    status: true
                }, {
                    headers: {
                        access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYXZpQGdtYWlsLmNvbSIsInJvbGUiOiJSZWd1bGFyIiwiaWF0IjoxNjU4MDUxMTUyfQ.q4ptrodlghZv78i4__LmRwg3twgBw4BQk1qtDERpKQ4`
                    }
                })
                console.log(response);
            } else if (status == true) {
                const response = await axios.patch(`http://localhost:3001/todoroute/todos/${id}`, {
                    status: false
                }, {
                    headers: {
                        access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYXZpQGdtYWlsLmNvbSIsInJvbGUiOiJSZWd1bGFyIiwiaWF0IjoxNjU4MDUxMTUyfQ.q4ptrodlghZv78i4__LmRwg3twgBw4BQk1qtDERpKQ4`
                    }
                })
                console.log(response);
            }
        }
        catch (err) {
            console.log(err);
        }
        // console.log(id, `id`);
    }
    return (
        <div className="card-body">
            <div class="form-check">
                <input onClick={(e) => handleClick(e, listOf.id, listOf.status)} class="form-check-input" type="checkbox" id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault">
                    {
                        listOf.status == true ? listOf.Task.description + `done` : listOf.Task.description
                    }


                </label>
            </div>
        </div>
    )
}