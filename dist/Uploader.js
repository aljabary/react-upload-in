import React,{Component}from"react";import UploadPreview from"./UploadPreview";import"./Uploader.css";class Uploader extends Component{state={files:[],enabled:!0,fterror:!1,errors:[]};filetypes=[];constructor(e){super(e),this.fl=null,this.setfl=e=>{this.fl=e},e.filetypes.forEach((e=>{this.filetypes+="."+e+","})),e.image&&(this.filetypes+=".jpg,.png,.jpeg,"),e.pdf&&(this.filetypes+=".pdf,"),e.doc&&(this.filetypes+=".doc,.docx,"),e.xl&&(this.filetypes+=".xls,.xlxs,"),this.browse=this.browse.bind(this)}componentDidMount(){}reset(){this.setState({files:[]})}browse(e){this.fl&&this.fl.click()}handleFileChange(e){let{files:t,errors:s}=this.state;for(var l=0;l<e.target.files.length;l++){var i=e.target.files[l],r=i.name.split(".").pop();if(r=r.toLowerCase(),!this.filetypes.includes(r))return s.push(1),this.setState({errors:s}),!1;t.push(i),this.setState({files:t,fterror:!1})}this.props.onselected&&this.props.onselected(t)}isEnabled(e){this.setState({enabled:e})}render(){const{errors:e,files:t}=this.state,{action:s,image:l,pdf:i,doc:r,xl:a,src:o,filetypes:n,onResult:c,buttonText:p,btnremove:d,onRemoved:h,theme:m}=this.props;let f,u="",v=!1;n.forEach((e=>{u+="."+e+","})),o&&(f=o),l&&(u+="image/*,"),i&&(u+=".pdf,"),r&&(u+=".doc,.docx,"),a&&(u+=".xls,.xlxs,"),this.state.enabled;let b=m||"default";return React.createElement("div",{className:"react-upload-in rui-theme-"+b},React.createElement("div",{className:"panel"},React.createElement("button",{className:"p-2 border rounded-lg bg-white flex flex-col items-center justify-center",onClick:this.browse.bind(this)},React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},React.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"})),React.createElement("span",null,p)),React.createElement("span",{className:"label"},this.props.label," "),React.createElement("input",{type:"file",style:{display:"none"},ref:this.setfl,multiple:!1!==this.props.multiple,onChange:this.handleFileChange.bind(this),accept:u})),React.createElement("div",{className:"list-upload"},t.map(((e,t)=>React.createElement(UploadPreview,{previewOnly:!!e.id,hideOnSuccess:this.props.hideOnSuccess,src:e,key:t,result:c,onRemoved:h,action:s}))),f?.map(((e,t)=>React.createElement(UploadPreview,{previewOnly:!!e.id,hideOnSuccess:this.props.hideOnSuccess,src:e,key:e.id,result:c,onRemoved:h,btnremove:!1===d,action:s}))),e.map(((e,t)=>React.createElement("div",{className:"alert danger",key:t},"File tipe tidak didukung!")))))}}export default Uploader;