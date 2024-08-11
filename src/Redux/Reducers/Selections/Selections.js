import { 
    GET_DATA_SELECTIONS,
    GET_DATA_SELECTIONS_SORT
} from "../../../Constants/Selections/Selections"

const INIT_STATE = {
    rex_data_selections    : [],
    rex_data_selections_sort : [
        {
			key: '1',
			name: 'Argentina',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374858/qsaornariwc7xab8qqxx.png'
		},
		{
			key: '2',
			name: 'Chile',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374869/eykmrl70wfz0s6f0nlx9.png'
		},
		{
			key: '3',
			name: 'Canada',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374839/ryocf37skylam3j4g2lm.png'
		},
		{
			key: '4',
			name: 'Peru',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374889/ldx8c6la3qrp4kxhzwu5.png'
		},
        {
			key: '5',
			name: 'Ecuador',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374876/i6aw6c8x87byajfrpxfj.png'
		},
		{
			key: '6',
			name: 'Venezuela',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374907/tm3gidyzcpx3k2zlskev.png'
		},
		{
			key: '7',
			name: 'Mexico',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374811/vzwnphcvjtqcj7rqyihg.png'
		},
		{
			key: '8',
			name: 'Jamaica',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374808/pejgfdfvca9w9wibahbw.png'
		},
        {
			key: '9',
			name: 'Uruguay',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374900/funwenwrcbvb5h0u6gsa.png'
		},
		{
			key: '10',
			name: 'Estados Unidos',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374818/owxsvjwgp2cq3ydkmcax.png'
		},
		{
			key: '11',
			name: 'Panama',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374803/bbdo92furlcxoybytrip.png'
		},
		{
			key: '12',
			name: 'Bolivia',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374850/p4opvoqvkt95n2yajate.png'
		},
        {
			key: '13',
			name: 'Colombia',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374864/cdogxisc653mtr2mlsdm.png'
		},
		{
			key: '14',
			name: 'Paraguay',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374892/i8ss6hplsmbu24siofam.png'
		},
		{
			key: '15',
			name: 'Brasil',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374844/t4f1qiivjra2w7p2edcy.png'
		},
		{
			key: '16',
			name: 'Costa Rica',
			image : 'https://res.cloudinary.com/josecruz9/image/upload/v1712374827/syji93bolfvpctmo25zv.png'
		},        
    ]
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_DATA_SELECTIONS:
            return {
                ...state,
                rex_data_selections: action.payload
        }
        default:
            return state
    }
}