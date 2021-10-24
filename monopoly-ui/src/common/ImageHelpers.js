export const getBackgroundColour=(imageId,type)=>{

    const background = {
        1:{
            primary:"#CF0932",
            secondary:"#FF2323BF",
            text:"#000000",
        },
        2:{
            primary:"#C4A8FF",
            secondary:"#664EAE",
            text:"#000000"
        },
        3:{
            primary:"#60262C",
            secondary:"#A32633",
            text:"#000000"
        },
        4:{
            primary:"#0A75BC",
            secondary:"#FCE029",
            text:"#000000"
        },
        5:{
            primary:"#B87A1B",
            secondary:"#C29336",
            text:"#000000"
        },
        6:{
            primary:"#8BC34A",
            secondary:"#59C721",
            text:"#000000"
        },
        7:{
            primary:"#F8B932",
            secondary:"#F97E3A",
            text:"#000000"
        },
        8:{
            primary:"#4C92CC",
            secondary:"#87B9E1",
            text:"#000000"
        },
        9:{
            primary:"#768cdb",
            secondary:"#ff6522",
            text:"#000000"
        },
        10:{
            primary:"#7AAE3D",
            secondary:"#CA47CA",
            text:"#000000"
        },
        11:{
            primary:"#586091",
            secondary:"#D35D33",
            text:"#000000"
        },
        12:{
            primary:"#E19720",
            secondary:"#FAD61D",
            text:"#000000"
        },
    };
    return background[imageId]?.[type];
}


export const  getImageList = (playersList) => {


    const imageList = [
        {value:1,text:'Anger'},
        {value:2,text:'Black Panther'},
        {value:3,text:'Deadpool'},
        {value:4,text:'Minion'},
        {value:5,text:'Po'},
        {value:6,text:'Mike Wazowski'},
        {value:7,text:'Tigger'},
        {value:8,text:'Genie'},
        {value:9,text:'Crash Bandicoot'},
        {value:10,text:'Joker'},
        {value:11,text:'Rocket Raccoon'},
        {value:12,text:'Pikachu'},
    ];
    const filteredList = imageList.map(image=>{
        return {
            ...image,
            disabled:playersList.findIndex(p=> p.imageId==image.value)>-1
        };

    });
    
    return filteredList;
} 