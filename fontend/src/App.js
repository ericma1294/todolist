import React, { useState, useEffect } from 'react'
import './styles/App.css'
import './styles/styles.css'

import taskService from './services/tasks'
import axios from 'axios'

import { Button, Input, List, Card, Row, Col, Modal } from 'antd'
import useWindowDimensions from './components/useWindowDimensions'

function App() {
  const [ data, setData ] = useState([])
  const [ currInput, setCurrInput ] = useState('')

  // const { height, width } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [test, setTest] = useState(false)

  useEffect(() => {
    taskService
        .getAll()
        .then(initialTasks => {
          setData(initialTasks)
        })
  }, [])

  const showModal = () => setIsModalVisible(true)

  const handleCancel = () => setIsModalVisible(false);

  const handleAddInput = (event) => setCurrInput(event.target.value);
  
  const handleAddItem = (event) => {
    event.preventDefault()
    var newTask = {
      id: setNewID(),
      task: currInput
    }

    taskService
      .create(newTask)
      .then(res => {
        setData(data.concat(res))
        setIsModalVisible(false)
        setCurrInput('')
      })
  }

  const handleDelete = (id) => {
    console.log("DELETE!!", id)
    taskService
      .deleteTask(id)
      .then(res => {
        console.log('RESPONSE', res)
        setData(res)
        
      })

    // setData(data.filter((val) => val.id !== id))
  }

  const setNewID = () => data.length === 0 ? 1 : data[data.length - 1].id + 1

  return (
    <div className="App">
      <div>
        <Row>
          {
            data.map((val) => {
              return (
                <Col key={val.id} xs={24} sm={12} lg={6}>
                  <Row className='notes' justify="center">
                    <Col span={24}>
                      <h1>{val.task}</h1>
                      <div className='taskFooter'>
                        <button className='deleteButton' onClick={() => handleDelete(val.id)}>Done!</button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              )
            })
          }
          <Col xs={24} sm={12} lg={6}>
            <Row className='addNotes' justify="center" align="middle">
              <Col span={24}>
                <button className='addButton' onClick={showModal}>
                  <h1>Add</h1>
                </button>
              </Col>
            </Row>
          </Col>
        </Row>   
      </div>

      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleAddItem} onCancel={handleCancel}>
        <Input placeholder="Basic usage" onChange={(e) => handleAddInput(e)} value={currInput} />

      </Modal>
    </div>
  );
}


export default App;
