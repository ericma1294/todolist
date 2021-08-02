import React, { useState, useEffect } from 'react'
import './styles/App.css'

import './styles/styles.css'

import { Button, Input, List, Card, Row, Col, Modal } from 'antd'
import useWindowDimensions from './components/useWindowDimensions'

const dummy = [
  {
    id: 1,
    task: "numba 1"
  },
  {
    id: 2,
    task: "numba 2"
  },
  {
    id: 3,
    task: "numba 3"
  }
]

function App() {
  const [ data, setData ] = useState(dummy)
  const [ currInput, setCurrInput ] = useState('')

  const { height, width } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => setIsModalVisible(true)

  const handleCancel = () => setIsModalVisible(false);

  const handleAddInput = (event) => setCurrInput(event.target.value);
  
  const handleAddItem = () => {
    var updatedList = [...data]
    var newTask = {
      id: setNewID(),
      task: currInput
    }
    setData(updatedList.concat(newTask))
    setIsModalVisible(false)
  }

  const handleDelete = (id) => setData(data.filter((val) => val.id !== id))

  const setNewID = () => data.length === 0 ? 1 : data[data.length - 1].id + 1

  return (
    <div className="App">
      <div>
        <List
          grid={{ gutter: 16, column: width < 768 ? 1 : width < 992 ? 2 : 4 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card title={item.task}>
                Card content
                <Button type='primary' onClick={() => handleDelete(item.id)}>Delete</Button>
              </Card>
            </List.Item>
          )}
        />  
        <Button type='primary' onClick={showModal}>Add</Button>
      </div>

      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleAddItem} onCancel={handleCancel}>
        <Input placeholder="Basic usage" onChange={(e) => handleAddInput(e)} />

      </Modal>
    </div>
  );
}


export default App;
