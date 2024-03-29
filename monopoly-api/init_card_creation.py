from monopoly import create_app
from monopoly.models import ActionCard,PropertiesCard,RentCard,CashCard,Cards,GamePlayAction,PropertiesColour
import monopoly.common.enums as Enum 
from monopoly import db
import random 

""" 
Purpose:Script for initial card data creation
"""

def create_properties_colour():
    propertiesColourCards =[
        PropertiesColour(colourId=Enum.Colours.Green ,onePairRentPrice=2 ,twoPairRentPrice=4,threePairRentPrice=7,fourPairRentPrice=None,numberNeededToCompleteSet=3),
        PropertiesColour(colourId=Enum.Colours.Brown ,onePairRentPrice=1 ,twoPairRentPrice=2,threePairRentPrice=None,fourPairRentPrice=None,numberNeededToCompleteSet=2),
        PropertiesColour(colourId=Enum.Colours.DarkBlue ,onePairRentPrice=3 ,twoPairRentPrice=8,threePairRentPrice=None,fourPairRentPrice=None,numberNeededToCompleteSet=2),
        PropertiesColour(colourId=Enum.Colours.LightBlue ,onePairRentPrice=1 ,twoPairRentPrice=2,threePairRentPrice=3,fourPairRentPrice=None,numberNeededToCompleteSet=3),
        PropertiesColour(colourId=Enum.Colours.Orange ,onePairRentPrice=1 ,twoPairRentPrice=3,threePairRentPrice=5,fourPairRentPrice=None,numberNeededToCompleteSet=3),
        PropertiesColour(colourId=Enum.Colours.Pink ,onePairRentPrice=1 ,twoPairRentPrice=2,threePairRentPrice=4,fourPairRentPrice=None,numberNeededToCompleteSet=3),
        PropertiesColour(colourId=Enum.Colours.Black ,onePairRentPrice=1 ,twoPairRentPrice=2,threePairRentPrice=3,fourPairRentPrice=4,numberNeededToCompleteSet=4),
        PropertiesColour(colourId=Enum.Colours.Red ,onePairRentPrice=2 ,twoPairRentPrice=3,threePairRentPrice=6,fourPairRentPrice=None,numberNeededToCompleteSet=3),
        PropertiesColour(colourId=Enum.Colours.Yellow ,onePairRentPrice=2 ,twoPairRentPrice=4,threePairRentPrice=6,fourPairRentPrice=None,numberNeededToCompleteSet=3),
        PropertiesColour(colourId=Enum.Colours.Neutral ,onePairRentPrice=1 ,twoPairRentPrice=2,threePairRentPrice=None,fourPairRentPrice=None,numberNeededToCompleteSet=2),
        PropertiesColour(colourId=Enum.Colours.Any ,onePairRentPrice=None,twoPairRentPrice=None,threePairRentPrice=None,fourPairRentPrice=None,numberNeededToCompleteSet=999)
    ]
    return propertiesColourCards

def create_action_cards():
    actionCards =[
        ActionCard(actionCardId=1,name="It's My Birthday",price=2,actionType=Enum.ActionTypes.ItsMyBirthday,transactionCost=2),
        ActionCard(actionCardId=2,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=3,name="Debt Collector",price=3,actionType=Enum.ActionTypes.DebtCollector,transactionCost=5),
        ActionCard(actionCardId=4,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=5,name="Debt Collector",price=3,actionType=Enum.ActionTypes.DebtCollector,transactionCost=5),
        ActionCard(actionCardId=6,name="Just Say No",price=4,actionType=Enum.ActionTypes.JustSayNo),
        ActionCard(actionCardId=7,name="Just Say No",price=4,actionType=Enum.ActionTypes.JustSayNo),
        ActionCard(actionCardId=8,name="Deal Breaker",price=5,actionType=Enum.ActionTypes.DealBreaker),
        ActionCard(actionCardId=9,name="House",price=3,actionType=Enum.ActionTypes.House),
        ActionCard(actionCardId=10,name="Deal Breaker",price=5,actionType=Enum.ActionTypes.DealBreaker),
        ActionCard(actionCardId=11,name="Forced Deal",price=3,actionType=Enum.ActionTypes.ForcedDeal),
        ActionCard(actionCardId=12,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=13,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=14,name="Just Say No",price=4,actionType=Enum.ActionTypes.JustSayNo),
        ActionCard(actionCardId=15,name="Double The Rent",price=1,actionType=Enum.ActionTypes.DoubleTheRent),
        ActionCard(actionCardId=16,name="Hotel",price=4,actionType=Enum.ActionTypes.Hotel),
        ActionCard(actionCardId=17,name="Forced Deal",price=3,actionType=Enum.ActionTypes.ForcedDeal),
        ActionCard(actionCardId=18,name="It's My Birthday",price=2,actionType=Enum.ActionTypes.ItsMyBirthday,transactionCost=2),
        ActionCard(actionCardId=19,name="It's My Birthday",price=2,actionType=Enum.ActionTypes.ItsMyBirthday,transactionCost=2),
        ActionCard(actionCardId=20,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=21,name="Sly Deal",price=3,actionType=Enum.ActionTypes.SlyDeal),
        ActionCard(actionCardId=22,name="Forced Deal",price=3,actionType=Enum.ActionTypes.ForcedDeal),
        ActionCard(actionCardId=23,name="Debt Collector",price=3,actionType=Enum.ActionTypes.DebtCollector,transactionCost=5),
        ActionCard(actionCardId=24,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=25,name="Double The Rent",price=1,actionType=Enum.ActionTypes.DoubleTheRent),
        ActionCard(actionCardId=26,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=27,name="Sly Deal",price=3,actionType=Enum.ActionTypes.SlyDeal),
        ActionCard(actionCardId=28,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=29,name="House",price=3,actionType=Enum.ActionTypes.House),
        ActionCard(actionCardId=30,name="House",price=3,actionType=Enum.ActionTypes.House),
        ActionCard(actionCardId=31,name="Hotel",price=4,actionType=Enum.ActionTypes.Hotel),
        ActionCard(actionCardId=32,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=33,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=34,name="Sly Deal",price=3,actionType=Enum.ActionTypes.SlyDeal)
    ]
    return actionCards

def create_properties_card():
    propertiesCards = [
        PropertiesCard(propertiesCardId=1,name="Baltic Aveue",primaryColourId=Enum.Colours.Brown,secondaryColourId=None,price=1,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=2,name="Property Wild Card",primaryColourId=Enum.Colours.LightBlue,secondaryColourId=Enum.Colours.Brown,price=1,isRotatable=True,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=3,name="B. & O. Railroad",primaryColourId=Enum.Colours.Black,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=4,name="Property Wild Card",primaryColourId=Enum.Colours.Green,secondaryColourId=Enum.Colours.Black,price=4,isRotatable=True,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=5,name="Oriental Avenue",primaryColourId=Enum.Colours.LightBlue,secondaryColourId=None,price=1,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=6,name="Mediterranean Avenue",primaryColourId=Enum.Colours.Brown,secondaryColourId=None,price=1,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=7,name="Property Wild Card",primaryColourId=Enum.Colours.Orange,secondaryColourId=Enum.Colours.Pink,price=2,isRotatable=True,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=8,name="Property Wild Card",primaryColourId=Enum.Colours.Red,secondaryColourId=Enum.Colours.Yellow,price=3,isRotatable=True,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=9,name="Electric Company",primaryColourId=Enum.Colours.Neutral,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=10,name="New York Avenue",primaryColourId=Enum.Colours.Orange,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=11,name="St. James Place",primaryColourId=Enum.Colours.Orange,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=12,name="Connecticut Avenue",primaryColourId=Enum.Colours.LightBlue,secondaryColourId=None,price=1,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=13,name="Property Wild Card",primaryColourId=Enum.Colours.Green,secondaryColourId=Enum.Colours.DarkBlue,price=4,isRotatable=True,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=14,name="Boardwalk",primaryColourId=Enum.Colours.DarkBlue,secondaryColourId=None,price=4,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=15,name="Park Place",primaryColourId=Enum.Colours.DarkBlue,secondaryColourId=None,price=4,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=16,name="Property Wild Card",primaryColourId=Enum.Colours.Any,secondaryColourId=None,price=0,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=17,name="Property Wild Card",primaryColourId=Enum.Colours.Any,secondaryColourId=None,price=0,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=18,name="Tennessee Avenue",primaryColourId=Enum.Colours.Orange,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=19,name="St. Charles Place",primaryColourId=Enum.Colours.Pink,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=20,name="Short Line",primaryColourId=Enum.Colours.Black,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=21,name="Pennsylvania Railroad",primaryColourId=Enum.Colours.Black,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=22,name="North Carolina Avenue",primaryColourId=Enum.Colours.Green,secondaryColourId=None,price=4,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=23,name="Property Wild Card",primaryColourId=Enum.Colours.Black,secondaryColourId=Enum.Colours.LightBlue,price=4,isRotatable=True,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=24,name="Ventnor Avenue",primaryColourId=Enum.Colours.Yellow,secondaryColourId=None,price=3,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=25,name="Reading Railroad",primaryColourId=Enum.Colours.Black,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=26,name="Atlantic Avenue",primaryColourId=Enum.Colours.Yellow,secondaryColourId=None,price=3,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=27,name="Property Wild Card",primaryColourId=Enum.Colours.Pink,secondaryColourId=Enum.Colours.Orange,price=2,isRotatable=True,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=28,name="Water Works",primaryColourId=Enum.Colours.Neutral,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=29,name="States Avenue",primaryColourId=Enum.Colours.Pink,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=30,name="Marvin Gardens",primaryColourId=Enum.Colours.Yellow,secondaryColourId=None,price=3,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=31,name="Pennsylvania Avenue",primaryColourId=Enum.Colours.Green,secondaryColourId=None,price=4,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=32,name="Pacific Avenue",primaryColourId=Enum.Colours.Green,secondaryColourId=None,price=4,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=33,name="Virginia Avenue",primaryColourId=Enum.Colours.Pink,secondaryColourId=None,price=2,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=34,name="Illinois Avenue",primaryColourId=Enum.Colours.Red,secondaryColourId=None,price=3,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=35,name="Property Wild Card",primaryColourId=Enum.Colours.Red,secondaryColourId=Enum.Colours.Yellow,price=3,isRotatable=True,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=36,name="Indiana Avenue",primaryColourId=Enum.Colours.Red,secondaryColourId=None,price=3,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=37,name="Property Wild Card",primaryColourId=Enum.Colours.Black,secondaryColourId=Enum.Colours.Neutral,price=2,isRotatable=True,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=38,name="Kentucky Avenue",primaryColourId=Enum.Colours.Red,secondaryColourId=None,price=3,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired),
        PropertiesCard(propertiesCardId=39,name="Vermont Avenue",primaryColourId=Enum.Colours.LightBlue,secondaryColourId=None,price=1,isRotatable=False,actionType=Enum.ActionTypes.NoActionRequired)
    ]
    return propertiesCards

def create_cash_card():
    cashCards = [
        CashCard(cashCardId=1,name="$3M Cash Card",price=3,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=2,name="$3M Cash Card",price=3,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=3,name="$2M Cash Card",price=2,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=4,name="$5M Cash Card",price=5,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=5,name="$3M Cash Card",price=3,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=6,name="$5M Cash Card",price=5,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=7,name="$1M Cash Card",price=1,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=8,name="$1M Cash Card",price=1,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=9,name="$10M Cash Card",price=10,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=10,name="$4M Cash Card",price=4,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=11,name="$1M Cash Card",price=1,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=12,name="$2M Cash Card",price=2,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=13,name="$4M Cash Card",price=4,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=14,name="$2M Cash Card",price=2,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=15,name="$2M Cash Card",price=2,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=16,name="$2M Cash Card",price=2,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=17,name="$1M Cash Card",price=1,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=18,name="$1M Cash Card",price=1,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=19,name="$1M Cash Card",price=1,actionType=Enum.ActionTypes.NoActionRequired),
        CashCard(cashCardId=20,name="$4M Cash Card",price=4,actionType=Enum.ActionTypes.NoActionRequired)
    ]
    return cashCards

def create_rent_card():
    rentCards = [
        RentCard(rentCardId=1,name="RailRoad - Utility Rent Card",primaryColourId=Enum.Colours.Black,secondaryColourId=Enum.Colours.Neutral,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=2,name="WildCard Rent Card",primaryColourId=Enum.Colours.Any,secondaryColourId=Enum.Colours.Any,actionType=Enum.ActionTypes.SinglePlayerRent,price=3),
        RentCard(rentCardId=3,name="Pink - Orange Rent Card",primaryColourId=Enum.Colours.Pink,secondaryColourId=Enum.Colours.Orange,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=4,name="Red - Yellow Rent Card",primaryColourId=Enum.Colours.Red,secondaryColourId=Enum.Colours.Yellow,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=5,name="RailRoad - Utility Rent Card",primaryColourId=Enum.Colours.Black,secondaryColourId=Enum.Colours.Neutral,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=6,name="Green - Dark Blue Rent Card",primaryColourId=Enum.Colours.Green,secondaryColourId=Enum.Colours.DarkBlue,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=7,name="Red - Yellow Rent Card",primaryColourId=Enum.Colours.Red,secondaryColourId=Enum.Colours.Yellow,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=8,name="Brown - Light Blue Rent Card",primaryColourId=Enum.Colours.Brown,secondaryColourId=Enum.Colours.LightBlue,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=9,name="Green - Dark Blue Rent Card",primaryColourId=Enum.Colours.Green,secondaryColourId=Enum.Colours.DarkBlue,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=10,name="WildCard Rent Card", primaryColourId=Enum.Colours.Any,secondaryColourId=Enum.Colours.Any,actionType=Enum.ActionTypes.SinglePlayerRent,price=3),
        RentCard(rentCardId=11,name="Pink - Orange Rent Card", primaryColourId=Enum.Colours.Pink,secondaryColourId=Enum.Colours.Orange,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=12,name="Brown - Light Blue Rent Card", primaryColourId=Enum.Colours.Brown,secondaryColourId=Enum.Colours.LightBlue,actionType=Enum.ActionTypes.MultiplePlayerRent,price=1),
        RentCard(rentCardId=13,name="WildCard Rent Card", primaryColourId=Enum.Colours.Any,secondaryColourId=Enum.Colours.Any,actionType=Enum.ActionTypes.SinglePlayerRent,price=3)
    ]
    return rentCards


def create_game_play_actions():
    game_play_actions = [
        GamePlayAction(gamePlayActionId=1,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play on Property Pile",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=2,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Cash,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=3,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Rent,actionType=Enum.ActionTypes.SinglePlayerRent,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=4,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Rent,actionType=Enum.ActionTypes.MultiplePlayerRent,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=5,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Rent,actionType=Enum.ActionTypes.SinglePlayerRent,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,isPreCheckRequired=True,description="Ask One Player to pay Rent"),
        GamePlayAction(gamePlayActionId=6,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Rent,actionType=Enum.ActionTypes.MultiplePlayerRent,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,isPreCheckRequired=True,description="Ask All Players to pay Rent"),
        GamePlayAction(gamePlayActionId=7,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Rent,actionType=Enum.ActionTypes.DoubleTheRent,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,isPreCheckRequired=True,description="Play Card with Double the Rent"),
        GamePlayAction(gamePlayActionId=8,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.Hotel,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=9,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.House,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=10,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.PassGo,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,description="Play on Play Pile"),
        GamePlayAction(gamePlayActionId=11,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.PassGo,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=12,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DoubleTheRent,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=13,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.ItsMyBirthday,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,isPreCheckRequired=True,description="Play on Play Pile"),
        GamePlayAction(gamePlayActionId=14,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.ItsMyBirthday,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=15,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DebtCollector,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,isPreCheckRequired=True,description="Play on Play Pile"),
        GamePlayAction(gamePlayActionId=16,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DebtCollector,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=17,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.JustSayNo,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=18,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.SlyDeal,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,isPreCheckRequired=True,description="Play on Play Pile"),
        GamePlayAction(gamePlayActionId=19,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.SlyDeal,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=20,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.ForcedDeal,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,isPreCheckRequired=True,description="Play on Play Pile"),
        GamePlayAction(gamePlayActionId=21,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.ForcedDeal,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),
        GamePlayAction(gamePlayActionId=22,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DealBreaker,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,isPreCheckRequired=True,description="Play on Play Pile"),
        GamePlayAction(gamePlayActionId=23,colourId=Enum.Colours.Any,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DealBreaker,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,description="Play on Cash Pile"),   
        GamePlayAction(gamePlayActionId=24,colourId=Enum.Colours.Green,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Green",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=25,colourId=Enum.Colours.Brown,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Brown",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=26,colourId=Enum.Colours.DarkBlue,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Dark Blue",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=27,colourId=Enum.Colours.LightBlue,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Light Blue",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=28,colourId=Enum.Colours.Orange,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Orange",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=29,colourId=Enum.Colours.Pink,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Pink",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=30,colourId=Enum.Colours.Black,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Black",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=31,colourId=Enum.Colours.Red,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Red",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=32,colourId=Enum.Colours.Yellow,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Yellow",isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=33,colourId=Enum.Colours.Neutral,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=Enum.ActionTypes.NoActionRequired,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,description="Play as Neutral",isPreCheckRequired=True),
    ]
    return game_play_actions

def create_card():
    
    app = create_app()
    
    with app.app_context():
        #list to map all cards
        cards=[]
        cardId=1
        group_number_list=[1,2,3,4]

        #create list of cards
        actionCards = create_action_cards()
        propertiesCards = create_properties_card()
        cashCards = create_cash_card()
        rentCards = create_rent_card()
        #move classification list
        gamePlayActions = create_game_play_actions()
        #property colors list 
        propertiesColours = create_properties_colour()

        while True:
            selected_index = random.randint(0,len(group_number_list)-1)
            selected_group = group_number_list[selected_index]

            if selected_group == 1:
                if len(actionCards)>0:
                    actionCard=actionCards.pop(0)
                    cards.append(Cards(cardId=cardId,price=actionCard.price,name=actionCard.name,cardType=Enum.CardTypes.Action,actionCardId=actionCard.actionCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index]
            elif selected_group == 2:
                if len(propertiesCards)>0:
                    propertiesCard=propertiesCards.pop(0)
                    cards.append(Cards(cardId=cardId,price=propertiesCard.price,name=propertiesCard.name,cardType=Enum.CardTypes.Properties,propertiesCardId=propertiesCard.propertiesCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index]
            elif selected_group == 3:
                if len(cashCards)>0:
                    cashCard=cashCards.pop(0)
                    cards.append(Cards(cardId=cardId,price=cashCard.price,name=cashCard.name,cardType=Enum.CardTypes.Cash,cashCardId=cashCard.cashCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index] 
            elif selected_group == 4:
                if len(rentCards)>0:
                    rentCard=rentCards.pop(0)
                    cards.append(Cards(cardId=cardId,price=rentCard.price,name=rentCard.name,cardType=Enum.CardTypes.Rent,rentCardId=rentCard.rentCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index] 

            if len(group_number_list) == 0:
                break

        #reset list 
        actionCards = create_action_cards()
        propertiesCards = create_properties_card()
        cashCards = create_cash_card()
        rentCards = create_rent_card()        
        

        try:
            db.session.query(Cards).delete()
            db.session.query(ActionCard).delete()
            db.session.query(PropertiesCard).delete()
            db.session.query(RentCard).delete()
            db.session.query(CashCard).delete()
            db.session.query(GamePlayAction).delete()
            db.session.query(PropertiesColour).delete()
            db.session.commit()
        except Exception as error:
            print(error)
            db.session.rollback()
    
        try:
            db.session.bulk_save_objects(propertiesColours)
            db.session.bulk_save_objects(actionCards)
            db.session.bulk_save_objects(propertiesCards)
            db.session.bulk_save_objects(cashCards)
            db.session.bulk_save_objects(rentCards)
            db.session.bulk_save_objects(cards)
            db.session.bulk_save_objects(gamePlayActions)
            db.session.commit() 
        except Exception as error:
            print(error)
            db.session.rollback()
        
if __name__ == '__main__':
    create_card()