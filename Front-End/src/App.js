import { useState, useEffect } from 'react'
import { db } from './services/firebaseServices';
import { ref, onValue, query, limitToLast } from "firebase/database";
import { Header, Stats, Control } from './components/components'


const App = () => {
  const [currentTemperature, setCurrentTemperature] = useState()
  const [temperatures, setTemperatures] = useState([])
  const [relays, setRelays] = useState([['Bulb_1', false], ['Fan_1', false], ['Switch_1', false]])






  useEffect(() => {
    onValue(ref(db, 'mlx90614/current'), snapshot => {
      const data = snapshot.val()
      setCurrentTemperature(data.ambient)
    })

    onValue(query(ref(db, "mlx90614/history/"), limitToLast(25)) , snapshot => {
      let childData = []
      snapshot.forEach((childSnapshot) => {
        childData.push(childSnapshot.val())
      })
      setTemperatures(childData)
    }, //{onlyOnce: true}
    );

    onValue(ref(db, 'Relays'), snapshot => {
      const data = snapshot.val()
      setRelays([['Bulb_1', data.Bulb_1], ['Fan_1', data.Fan_1], ['Switch_1', data.Switch_1]])
    })
  }, [])
  return (
    <div className="container">
      <Header />
      <Stats currentTemperature={currentTemperature} temperatures={temperatures} />
      <Control relays={relays} />
    </div>
  )
}

export default App;
