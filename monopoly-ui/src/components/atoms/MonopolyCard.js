import React,{useState} from 'react'
import styled,{keyframes,css} from 'styled-components'
import PropTypes from 'prop-types';
import { device } from '../../common/devices';
import { CardTypeEnum,TransactionTrackerStatusEnum, GameCardLocationStatusEnum,PayeeTransactionStatusEnum } from '../../common/constants';
import faceDownCardImg from '../../assets/img/face-down-card.jpg' 
import { Popover } from 'react-tiny-popover'
import {PreMoveCardPopoverContent} from '../atoms/PreMoveCardPopoverContent'
import {InPlayMoveCardPopoverContent} from '../atoms/InPlayMoveCardPopoverContent'
import { SelectionMoveCardPopoverContent } from './SelectionMoveCardPopoverContent';
import { PropertyMoveCardPopoverContent } from './PropertyMoveCardPopoverContent';
import { TradeTransactionCardPopoverContent } from './TradeTransactionCardPopoverContent';



const bounce = keyframes`
    20% { transform:translateY(-7%); }
    40% { transform:translateY(0%); }
    40% { transform:translateY(-7%); }
    60% { transform:translateY(0%); }
    80% { transform:translateY(-7%); }
    100% { transform:translateY(0%); }
`;
const StyledMiniCard = styled.img`
    &:hover {
        animation: ${bounce} 1.3s linear infinite;
    }
    cursor:pointer;
    border:1px solid black;
    height:30px;  
    margin:2px;
`;


const StyledCard = styled.img`
    opacity: ${(props) => props.isCardSelectable || props.cardType == CardTypeEnum.InPlayCard?'1':'1'};
    transform: ${(props) => props.isCardRightSideUp?'rotate(0deg)':'rotate(180deg)'};
    cursor:${(props) =>props.isCardSelectable? 'pointer':'not-allowed' };
    border:3px solid ${(props) =>props.isHighlighted? '#5DE23C':'black' };
    height:200px;
    &:hover {
        border: 3px solid #5DE23C;
    }
`;



export const MonopolyCard = ({gameCard,onClick,cardType,isCardSelectable=false,listOfPossibleMoves=[], popoverType=null,transactionTracker=null}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPopoverOpen,setIsPopoverOpen] = useState(false);

    
    const isHighlighted = (popoverType,listOfPossibleMoves,gameCard) =>{
        //highlight is only used when trade is in progress
        if(popoverType !=  TransactionTrackerStatusEnum.OthersAcknowledge)
            return false;
        else
            return listOfPossibleMoves.find(t=>t.gameCardId == gameCard.gameCardId && t.isSelected == true);
    }


    return (
        <React.Fragment>
                    {cardType == CardTypeEnum.FaceUpCard && 
                        <Popover
                            isOpen={isPopoverOpen}
                            positions={['top']} 
                            padding={10} 
                            reposition={false} 
                            onClickOutside={() => setIsPopoverOpen(false)} 
                            content={({ position, nudgedLeft, nudgedTop }) => {
                                
                                if(popoverType == TransactionTrackerStatusEnum.InProgress && gameCard.cardLocationStatus == GameCardLocationStatusEnum.IsOnHand)
                                    return <PreMoveCardPopoverContent gameCard={gameCard} listOfPossibleMoves={listOfPossibleMoves} setIsPopoverOpen={setIsPopoverOpen} />
                                else if(popoverType == TransactionTrackerStatusEnum.CurrentPlayerSelection)
                                    return <InPlayMoveCardPopoverContent gameCard={gameCard} listOfPossibleMoves={listOfPossibleMoves} setIsPopoverOpen={setIsPopoverOpen} />
                                else if(popoverType ==  TransactionTrackerStatusEnum.OtherPlayerSelection)
                                    return <SelectionMoveCardPopoverContent gameCard={gameCard} listOfPossibleMoves={listOfPossibleMoves} setIsPopoverOpen={setIsPopoverOpen} />
                                else if(popoverType ==  TransactionTrackerStatusEnum.OthersAcknowledge)
                                    if(transactionTracker && 
                                        (transactionTracker.tradePayeeTransactions.length == 0   ||
                                        transactionTracker.tradePayeeTransactions.filter(trade => trade.payeeTransactionStatus == PayeeTransactionStatusEnum.NotPaid).length == 0)) 
                                        return <PropertyMoveCardPopoverContent gameCard={gameCard} listOfPossibleMoves={listOfPossibleMoves} setIsPopoverOpen={setIsPopoverOpen} />
                                    else
                                        return <TradeTransactionCardPopoverContent gameCard={gameCard} listOfPossibleMoves={listOfPossibleMoves} setIsPopoverOpen={setIsPopoverOpen} />
                                else
                                    return <PropertyMoveCardPopoverContent gameCard={gameCard} listOfPossibleMoves={listOfPossibleMoves} setIsPopoverOpen={setIsPopoverOpen} />
                            }}
                        >
                            <StyledCard src={gameCard.card.cardImageUrl}
                                style={{ visibility: isLoaded ? "visible" : "hidden" }}
                                isCardSelectable={isCardSelectable}
                                isCardRightSideUp={gameCard.isCardRightSideUp}
                                isHighlighted={isHighlighted(popoverType,listOfPossibleMoves,gameCard)}
                                cardType={cardType}
                                onLoad={() => {
                                    setIsLoaded(true);
                                }}
                                onClick={()=>{isCardSelectable &&  setIsPopoverOpen(true)}}
                            />
                        </Popover>
                    }
                    {cardType ==CardTypeEnum.MiniFaceDownCard &&
                        <StyledMiniCard src={faceDownCardImg} />
                    }
                    {cardType ==CardTypeEnum.FaceDownCard &&
                        <StyledCard src={faceDownCardImg} isCardRightSideUp={true} isCardSelectable={isCardSelectable} onClick={onClick}/>
                    }
                    {cardType ==CardTypeEnum.InPlayCard &&
                        <StyledCard src={gameCard.card.cardImageUrl}
                        style={{ visibility: isLoaded ? "visible" : "hidden" }}
                        isCardSelectable={isCardSelectable}
                        cardType={cardType}
                        isCardRightSideUp={gameCard.isCardRightSideUp}
                        onLoad={() => {
                            setIsLoaded(true);
                        }}
                    />
                    }
        </React.Fragment>
    )
}

  


