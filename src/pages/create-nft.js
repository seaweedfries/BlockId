import React from 'react';
import { NFTStorage, File } from 'nft.storage'
import { useState } from 'react'
import { 
	Box,
	Text,
	Divider,
	Stack,
	Image,
	Button,
	Input,
 } from '@chakra-ui/react'

 //nft.storage API key CHANGE THIS
const apiKeys = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA1ZGJEMzM4N2U3ZDJhNTRCODQwYkFjOUVmZGIwOTJkNGRGMTVGZDMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTI4NjczOTA1MCwibmFtZSI6IkJsb2NrSUQifQ.PetsVefIO9rpoSHXg6EYwzLdgexFGEmh02yH0ORMLVQ';

function CreateNFT(props) {
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [nftName, setNftName] = useState('')
	const [imageName, setImageName] = useState('')
	const [imageType, setImageType] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	

	const handleImage = (event) => {
		setImage(event.target.files[0])
		setImageName(event.target.files[0].name)
		setImageType(event.target.files[0].type)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(false)
		try {
		const client = new NFTStorage({ token: apiKeys })
		const metadata = await client.store({
			name: nftName,
			description: `${description}`,
			owner: props.account,
			image: new File([image], imageName, { type: imageType }),
		})		

		if (metadata) {
			setIsLoading(true)
			props.updateUList(metadata.ipnft);
			console.log(metadata.ipnft)	
		}
		} catch (error) {
		console.log(error)
		}
	}

	return (
		<Box display='flex' justifyContent="center" margin='8' borderRadius='lg' h="550px">
			<Box display='flex' justifyContent="center" bg='blue.100' w='600px' borderRadius='lg'>
				<Stack padding='10' direction='column' justifyContent='center'>
				{image ? (
					<Box boxSize='sm'>
						<Image src={URL.createObjectURL(image)} alt="NFT" height="300px"/>
					</Box>
					) : ('')}
				<input
					accept="image/*"
					className="input"
					id="icon-button-photo"
					defaultValue={image}
					onChange={handleImage}
					type="file"
					/>
				</Stack>
			</Box>
			<Divider orientation='vertical' w='10px'/>
			<Box bg='blue.100' w='600px' borderRadius='lg'>
				<Stack padding='10' direction='column' id='rightbox'>
					<Box h='100px'/>
					<Text>Title: </Text>
					<Input placeholder='Title' variant='filled' onChange={(e) => setNftName(e.target.value)}/>
					<Text>Description: </Text>
					<Input placeholder='Description' variant='filled' onChange={(e) => setDescription(e.target.value)}/>
					<Box></Box>
					{isLoading ? (<Button onClick={handleSubmit} loadingText='Submitting' id='submitbutton'>Submit</Button>) : (<Button onClick={handleSubmit} loadingText='Submitting' id='submitbutton' isLoading>Submit</Button>)}
					<Box height={1}/>
				</Stack>
			</Box>
		</Box>
	)
}

export default CreateNFT;

// rejectNFTRequest() { async (t) => {
//   //send notification to address
// }
// }