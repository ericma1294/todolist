import React, { useState, useEffect } from 'react'
import './styles/App.css'
import './styles/styles.css'

import taskService from './services/tasks'
import axios from 'axios'

import { Button, Input, Row, Col, Modal, DatePicker, Popover } from 'antd'
import useWindowDimensions from './components/useWindowDimensions'

function App() {
  const [ data, setData ] = useState([])
  const [ currInput, setCurrInput ] = useState('')
  const [ currDescriptionInput, setCurrDescriptionInput ] = useState('')
  const [ currDeadline, setCurrDeadline ] = useState('')
  const { height, width } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    taskService
        .getAll()
        .then(initialTasks => {
          setData(initialTasks)
        })
  }, [])

  const showModal = () => setIsModalVisible(true)

  const handleCancel = () => setIsModalVisible(false);

  const handleAddInput = (e) => setCurrInput(e.target.value);
  
  const handleAddDescription = (e) => setCurrDescriptionInput(e.target.value);

  const handleDeadline = (date, dateString) => setCurrDeadline(dateString)


  const handleAddItem = (event) => {
    event.preventDefault()
    var newTask = {
      id: setNewID(),
      task: currInput,
      description: currDescriptionInput,
      deadline: currDeadline
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

  const mobileDescription = (val) => {
    return (
      <p>{val}</p>
    )
  }

  console.log('screen width', width)
  return (
    <div className="App">
      <div>
        <Row justify='center'>
          {
            width <= 480 ?
              <>
                {
                  data.map((val) => {
                    return (
                      <Col key={val.id}>
                        <Row className='mobileDisplay' align='middle'>
                          <Col span={16}>
                            <Popover content={mobileDescription(val.description)} 
                                     trigger="click"
                                     placement='top'>
                              <h2>{val.task}</h2>
                            </Popover>
                          </Col>
                          <Col span={8} onClick={() => handleDelete(val.id)}>
                            <h3 className='mobileDeadline'>{val.deadline.substring(5)}</h3>
                          </Col>
                        </Row>
                      </Col>
                    )
                  })
                }
                <Col>
                  <Row className='addNotes' align="middle">
                    <Col span={24}>
                      <button className='addButton' onClick={showModal}>
                        <h1>Add</h1>
                      </button>
                    </Col>
                  </Row>
                </Col>
              </>
            :
              <>
                {
                  data.map((val) => {
                    return (
                      <Col key={val.id} xs={24} sm={12} lg={6}>
                        <Row className='notes' justify="center">
                          <Col span={24}>
                            <h1>{val.task}</h1>
                            <p>{val.description}</p>
                            <div className=''>
                              <h4 className='deadline'>By: <strong>{val.deadline}</strong></h4>
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
              </>
          }
          
        </Row>   
      </div>

      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleAddItem} onCancel={handleCancel}>
        <Row>
          <Col xs={24} sm={4}>
            <h4>Task:</h4>
          </Col>
          <Col xs={24} sm={20}>
            <Input placeholder="What Task?" onChange={(e) => handleAddInput(e)} value={currInput} />
          </Col>          
        </Row>
        <Row>
          <Col xs={24} sm={4}>
            <h4>Description:</h4>
          </Col>
          <Col xs={24} sm={20}>
            <Input placeholder="Insert a description" onChange={(e) => handleAddDescription(e)} value={currDescriptionInput}/>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={17}>
            <h4>When do you want to accomplish this task?:</h4>
          </Col>
          <Col xs={24} sm={7}>
            <DatePicker  onChange={handleDeadline} />
          </Col>
        </Row>
        
      </Modal>
    </div>
  );
}


export default App;
