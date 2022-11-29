import { updateFirebase } from './../services/firebaseServices';
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS, CategoryScale,
    LinearScale, PointElement,
    LineElement, Title,
    Tooltip, Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale, LinearScale,
    PointElement, LineElement,
    Title, Tooltip, Legend
)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Temperature History',
        },
    },
}



const Header = () =>
    <div className="container p-5 my-5 bg-dark text-white">
        <center><h1>Smart Iot Systm for Home</h1></center>
    </div>

const Stats = (props) => {
    const data = {
        labels: props.temperatures.map((data) => data.date.slice(8)+" " + data.time.slice(0, 8)),
        datasets: [
            {
                label: "Temperature",
                data: props.temperatures.map((data) => data.ambient),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    }
    return (
        <div className="card card-body" >
            <h2 className="card-title"> Statistics </h2>

            <div className="row">
                <div className="col-sm-4">
                    <div className="card card-body bg-info">
                        <div className="row">
                            <div className="col-md">
                                <h3>Current <br /> Temperature</h3>
                            </div>
                            <div className="col-md d-flex align-items-end justify-content-end">
                                <h1 className="display-5">{props.currentTemperature} °C</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <Line options={options} data={data} />
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

const Control = ({ relays }) => {
    const toggleButton = (relay) => {
        const updates = {}
        updates['/Relays/' + relay[0]] = !relay[1]
        updateFirebase(updates)
    }

    return (
        <div className="card p-3">
            <h2 className="card-title"> Control Panel </h2>
            <div className="row">
                {relays.map(relay =>
                    <div key={relay} className="col-md d-flex align-items-center justify-content-center">{relay[0]} &nbsp;
                        <button
                            type="button"
                            className={relay[1] ? "btn btn-success" : "btn btn-danger"}
                            onClick={() => toggleButton(relay)}>
                            {relay[1] ? "On" : "Off"}
                        </button>
                    </div>)}
            </div>
        </div>
    )
}


export { Header, Stats, Control }
