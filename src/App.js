import React from 'react';
import './App.css';
import Uploader from './Uploader'
class App extends React.Component {
  state={images:[
    {id:1,name:'skd11.jpg', src:'http://localhost/ok/skd11.jpg'},
    {id:2,name:'IMG-1294.jpg', src:'http://localhost/ok/IMG-1294.jpg'},
  ]}
  constructor(props){
    super(props)    
	  this.uploader = React.createRef()
  }
resultUpload(response){ 
  const {images}=this.state
  images.push({id: response.id, src:'http://localhost/ok/'+response.file, name: response.file})
  this.setState({images})
}
onRemoved(file){  
  let{images}=this.state
  images =  images.filter(x => x.src !== file.src)
  this.setState({images})
}
  render(){
    const {images}=this.state

    return (<div className='p-32'>
      <Uploader ref = {this.uploader}
      src={images}
      theme="light"
      label="Upload max 5 photos" 
      buttonText={"Upload"}
      action={"http://localhost/ok/upload.php"}
      filetypes={["png","jpg","pdf"]} 
      image={false}
      onResult={this.resultUpload.bind(this)} 
      onRemoved={this.onRemoved.bind(this)}
      hideOnSuccess={true}/>
    </div>);
  }
}

export default App;
