export const getBackgroundColour=(imageId)=>{

    const background = {
        1:"#FF2323BF",
        2:"#C4A8FF",
        3:"#D12531",
        4:"#FCE029",
        5:"#B87A1B",
        6:"#8BC34A",
        7:"#F97E3A",
        8:"#4C92CC",
        9:"#ECE3E3",
        10:"#CA47CA",
        11:"#A9A9A9",
        12:"#FAD61D"
    };
    return background[imageId];
}


export const  getImageList = () => {


    const imageList = [
        {value:1,text:'Anger'},
        {value:2,text:'Black Panther'},
        {value:3,text:'Deadpool'},
        {value:4,text:'Minion'},
        {value:5,text:'Po'},
        {value:6,text:'Mike Wazowski'},
        {value:7,text:'Tigger'},
        {value:8,text:'Genie'},
        {value:9,text:'Olaf'},
        {value:10,text:'Joker'},
        {value:11,text:'Rocket Raccoon'},
        {value:12,text:'Pikachu'},
    ];

    return imageList;
} 