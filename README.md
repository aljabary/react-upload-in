# React Upload Component (reac-upload-in)
This is the react component for upload files or images with easier and faster, support multiple upload and there are several themes.
![Screenshoot](/public/sc1.png)
![Screenshoot](/public/sc2.png)

#### Install
```
npm i react-upload-in
```
#### [Demo and Tutorial] (https://youtu.be/5vU4DanvzPk) 
#### Attributes
| Attributes  | type | descriptions |
| ------------- | ------------- | ------------- |
| **ref**  | reference  | React reference (React.CreateRef) |
| **src**  | array object  | data files to display |
| **theme**  | string (optional)  | themes available: light, sky, white |
| **label** | string | The label for UI uploader |
| **action** | string | URL endpoint for upload to server |
| **filetypes** | array string | determine file support for upload by extentions, e.g: "png", "jpg" |
| **buttonText** | string | The text for button browse |
| **setHeader** | object | set header request to server |
| **removeText** | string | label text for remove button |
| **image** | boolean | default *true*, wether you aim this uploader for image |
| **hideOnSuccess** | boolean | default *false*, when upload has finish if you want hide preview you can set *true* |
| **onResult** | function (response) | this function will be called when upload finish, and give you response from server |
| **onRemoved** | function (file) | this function will be called when remove button is clicked and give you the item file removed |
#### Usage
```javascript
import Uploader from 'react-upload-in'
<Uploader ref = {this.uploader}
      src={images}
      theme="sky"
      label="Upload max 5 photos" 
      buttonText={"Upload"}
      action={"http://localhost/ok/upload.php"}
      filetypes={["png","jpg","pdf"]} 
      image={false}
      onResult={this.resultUpload.bind(this)} 
      onRemoved={this.onRemoved.bind(this)}
      removeText="remove"
      hideOnSuccess={true}/>
    </div>
````
#### Example
```javascript
import React from 'react';
import './App.css';
import Uploader from 'react-upload-in';
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
      theme="sky"
      label="Upload max 5 photos" 
      buttonText={"Upload"}
      action={"http://localhost/ok/upload.php"}
      setHeader={{key:'Authorization',value:'yourtoken'}}
      filetypes={["png","jpg","pdf"]} 
      image={false}
      onResult={this.resultUpload.bind(this)} 
      onRemoved={this.onRemoved.bind(this)}
      hideOnSuccess={true}/>
    </div>);
  }
}

export default App;
```
#### Working with Ref
```javascript
this.uploader.current.reset() //rest uploadere state and clear list data to display
this.uploader.current.isEnabled(false) //enable/disable upload button, 
//if you want limit files to upload, 
//you can call this method when files number reach to the limit
``
