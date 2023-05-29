import React from 'react';
import './create-nft.css'
import { NFTStorage, File } from 'nft.storage'
import { useState } from 'react'
import uList from '../unapprovedNFTList';

const apiKeys = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA1ZGJEMzM4N2U3ZDJhNTRCODQwYkFjOUVmZGIwOTJkNGRGMTVGZDMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTI4NjczOTA1MCwibmFtZSI6IkJsb2NrSUQifQ.PetsVefIO9rpoSHXg6EYwzLdgexFGEmh02yH0ORMLVQ';

function CreateNFT(props) {
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [nftName, setNftName] = useState('')
	const [imageName, setImageName] = useState('')
	const [imageType, setImageType] = useState('')
	const [unapprovedList, setUnapprovedList] = useState(uList)

	const handleImage = (event) => {
		setImage(event.target.files[0])
		setImageName(event.target.files[0].name)
		setImageType(event.target.files[0].type)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
		const client = new NFTStorage({ token: apiKeys })
		const metadata = await client.store({
			name: nftName,
			description: `${description}`,
			owner: props.account,
			image: new File([image], imageName, { type: imageType }),
		})		

		if (metadata) {
			document.getElementById("status").textContent = "Sent!";
			const url = metadata.url,
			time = Date().toLocaleString(),
			newList = unapprovedList.push({metadata.url, props.account, Date().toLocaleString()}); //check sending
			setUnapprovedList(newList);
			console.log(unapprovedList);
		}
		} catch (error) {
		console.log(error)
		}
	}

	return (
		<center
			className="root-create-pet"
			style={{ paddingBottom: '3rem'}}
		>
			<div>
			<h2 className="title" color="textPrimary" gutterBottom>
				Upload Your Document
			</h2>
			
			{
	image ? (
		<img src={URL.createObjectURL(image)} alt="pet" className="img-preview" height={300}/>
	) : (
		''
	)
	}
	<div className="form-container" style={{ height:'500'}}>
	<form className="form" noValidate autoComplete="off">
		<span>
		<input
		accept="image/*"
		className="input"
		id="icon-button-photo"
		defaultValue={image}
		onChange={handleImage}
		type="file"
		/>
		</span>
		<label>NFT Name:</label>
		<input
		fullWidth
		id="outlined-basic"
		label="NFT's name"
		variant="outlined"
		className="text-field"
		defaultValue={nftName}
		onChange={(e) => setNftName(e.target.value)}
		/>
		<label>Owner Name:</label>
		<input
		fullWidth
		id="outlined-basic"
		label="Owner's name"
		variant="outlined"
		className="text-field"
		defaultValue={description}
		onChange={(e) => setDescription(e.target.value)}
		/>
		<button
		size="large"
		variant="contained"
		color="primary"
		onClick={handleSubmit}
		>
		Submit
		</button>
		<h3 id="status" className='notification'></h3>
	</form>
	</div>
        </div>
      </center>
  )
}

export default CreateNFT;

  // mintNFTRequest() { async (t) => {
  //   t.preventDefault();
  //   newrequest = this.requests;
  //   const sender = document.getElementById("currentaccount").value;
  //   var tokenid = totalSupply().add(1);
  //   const url = document.getElementById("url").value;

  //   newrequest.push({sender: sender, id: tokenid, url: url})
  //   console.log(newrequest);
  //   this.setState({requests: newrequest})  
  // };}

    // approveNFTRequest() { async (t) => {
  //   //get values
  //   //unlock account
  //   await this.state.web3.eth.personal.unlockAccount(this.owner, this.password, 600); 
  //   // Get permission to access user funds to pay for gas fees
  //   const gas = await mintNFTContract.methods.mint(address, tokenid, urlstring).estimateGas();
  //   const post = await mintNFTContract.methods.mint(address, tokenid, urlstring).send({
  //     from: account,
  //     gas,
  //   });
  // };}

    // rejectNFTRequest() { async (t) => {
  //   //send notification to address
  // }
  // }