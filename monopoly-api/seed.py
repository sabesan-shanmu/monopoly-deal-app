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
        PropertiesColour(colourId=Enum.Colours.Any ,onePairRentPrice=None,twoPairRentPrice=None,threePairRentPrice=None,fourPairRentPrice=None,numberNeededToCompleteSet=None)
    ]
    return propertiesColourCards

def create_action_cards():
    actionCards =[
        ActionCard(actionCardId=1,name="It's My Birthday",price=2,actionType=Enum.ActionTypes.ItsMyBirthday,transactionCost=2),
        ActionCard(actionCardId=2,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=3,name="Debt Collector",price=3,actionType=Enum.ActionTypes.DebtCollector,transactionCost=2),
        ActionCard(actionCardId=4,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=5,name="Debt Collector",price=3,actionType=Enum.ActionTypes.DebtCollector,transactionCost=2),
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
        ActionCard(actionCardId=23,name="Debt Collector",price=3,actionType=Enum.ActionTypes.DebtCollector,transactionCost=2),
        ActionCard(actionCardId=24,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=25,name="Double The Rent",price=1,actionType=Enum.ActionTypes.DoubleTheRent),
        ActionCard(actionCardId=26,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=27,name="Sly Deal",price=3,actionType=Enum.ActionTypes.SlyDeal),
        ActionCard(actionCardId=28,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=29,name="House 3",price=3,actionType=Enum.ActionTypes.House),
        ActionCard(actionCardId=30,name="House 3",price=3,actionType=Enum.ActionTypes.House),
        ActionCard(actionCardId=31,name="Hotel 4",price=4,actionType=Enum.ActionTypes.Hotel),
        ActionCard(actionCardId=32,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=33,name="Pass Go",price=1,actionType=Enum.ActionTypes.PassGo),
        ActionCard(actionCardId=34,name="Sly Deal",price=3,actionType=Enum.ActionTypes.SlyDeal)
    ]
    return actionCards

def create_properties_card():
    propertiesCards = [
        PropertiesCard(propertiesCardId=1,name="Baltic Aveue",primaryColourId=Enum.Colours.Brown,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=2,name="Property Wild Card",primaryColourId=Enum.Colours.Brown,secondaryColourId=Enum.Colours.LightBlue,price=1),
        PropertiesCard(propertiesCardId=4,name="Property Wild Card",primaryColourId=Enum.Colours.Green,secondaryColourId=Enum.Colours.Black,price=4),
        PropertiesCard(propertiesCardId=5,name="Oriental Avenue",primaryColourId=Enum.Colours.LightBlue,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=6,name="Mediterranean Avenue",primaryColourId=Enum.Colours.Brown,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=7,name="Property Wild Card",primaryColourId=Enum.Colours.Orange,secondaryColourId=Enum.Colours.Pink,price=2),
        PropertiesCard(propertiesCardId=8,name="Property Wild Card",primaryColourId=Enum.Colours.Red,secondaryColourId=Enum.Colours.Yellow,price=3),
        PropertiesCard(propertiesCardId=9,name="Electric Company",primaryColourId=Enum.Colours.Neutral,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=10,name="New York Avenue",primaryColourId=Enum.Colours.Orange,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=11,name="St. James Place",primaryColourId=Enum.Colours.Orange,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=12,name="Connecticut Avenue",primaryColourId=Enum.Colours.LightBlue,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=13,name="Property Wild Card",primaryColourId=Enum.Colours.Green,secondaryColourId=Enum.Colours.DarkBlue,price=4),
        PropertiesCard(propertiesCardId=14,name="Park Place",primaryColourId=Enum.Colours.DarkBlue,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=15,name="Boardwalk",primaryColourId=Enum.Colours.DarkBlue,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=16,name="Property Wild Card",primaryColourId=Enum.Colours.Any,secondaryColourId=None,price=0),
        PropertiesCard(propertiesCardId=17,name="Property Wild Card",primaryColourId=Enum.Colours.Any,secondaryColourId=None,price=0),
        PropertiesCard(propertiesCardId=18,name="Tennessee Avenue",primaryColourId=Enum.Colours.Orange,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=19,name="St. Charles Place",primaryColourId=Enum.Colours.Pink,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=20,name="Short Line",primaryColourId=Enum.Colours.Black,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=21,name="Pennsylvania Railroad",primaryColourId=Enum.Colours.Black,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=22,name="North Carolina Avenue",primaryColourId=Enum.Colours.Green,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=23,name="Property Wild Card",primaryColourId=Enum.Colours.Black,secondaryColourId=Enum.Colours.LightBlue,price=4),
        PropertiesCard(propertiesCardId=24,name="Ventnor Avenue",primaryColourId=Enum.Colours.Yellow,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=25,name="Reading Railroad",primaryColourId=Enum.Colours.Black,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=26,name="Atlantic Avenue",primaryColourId=Enum.Colours.Yellow,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=27,name="Property Wild Card",primaryColourId=Enum.Colours.Pink,secondaryColourId=Enum.Colours.Orange,price=2),
        PropertiesCard(propertiesCardId=28,name="Water Works",primaryColourId=Enum.Colours.Neutral,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=29,name="States Avenue",primaryColourId=Enum.Colours.Pink,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=30,name="Marvin Gardens",primaryColourId=Enum.Colours.Yellow,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=31,name="Pennsylvania Avenue",primaryColourId=Enum.Colours.Green,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=32,name="Pacific Avenue",primaryColourId=Enum.Colours.Green,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=33,name="Virginia Avenue",primaryColourId=Enum.Colours.Pink,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=34,name="Illinois Avenue",primaryColourId=Enum.Colours.Red,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=35,name="Property Wild Card",primaryColourId=Enum.Colours.Red,secondaryColourId=Enum.Colours.Yellow,price=3),
        PropertiesCard(propertiesCardId=36,name="Indiana Avenue",primaryColourId=Enum.Colours.Red,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=37,name="Property Wild Card",primaryColourId=Enum.Colours.Neutral,secondaryColourId=Enum.Colours.Black,price=2),
        PropertiesCard(propertiesCardId=38,name="Kentucky Avenue",primaryColourId=Enum.Colours.Red,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=39,name="Vermont Avenue",primaryColourId=Enum.Colours.LightBlue,secondaryColourId=None,price=1)
    ]
    return propertiesCards

def create_cash_card():
    cashCards = [
        CashCard(cashCardId=1,price=3),
        CashCard(cashCardId=2,price=3),
        CashCard(cashCardId=3,price=2),
        CashCard(cashCardId=4,price=5),
        CashCard(cashCardId=5,price=3),
        CashCard(cashCardId=6,price=5),
        CashCard(cashCardId=7,price=1),
        CashCard(cashCardId=8,price=1),
        CashCard(cashCardId=9,price=10),
        CashCard(cashCardId=10,price=4),
        CashCard(cashCardId=11,price=1),
        CashCard(cashCardId=12,price=2),
        CashCard(cashCardId=13,price=4),
        CashCard(cashCardId=14,price=2),
        CashCard(cashCardId=15,price=2),
        CashCard(cashCardId=16,price=2),
        CashCard(cashCardId=17,price=1),
        CashCard(cashCardId=18,price=1),
        CashCard(cashCardId=19,price=1),
        CashCard(cashCardId=20,price=4)
    ]
    return cashCards

def create_rent_card():
    rentCards = [
        RentCard(rentCardId=1,primaryColourId=Enum.Colours.Black,secondaryColourId=Enum.Colours.Neutral,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=2,primaryColourId=Enum.Colours.Any,secondaryColourId=Enum.Colours.Any,payee=Enum.Payee.Single,price=3),
        RentCard(rentCardId=3,primaryColourId=Enum.Colours.Pink,secondaryColourId=Enum.Colours.Orange,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=4,primaryColourId=Enum.Colours.Red,secondaryColourId=Enum.Colours.Yellow,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=5,primaryColourId=Enum.Colours.Black,secondaryColourId=Enum.Colours.Neutral,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=6,primaryColourId=Enum.Colours.Green,secondaryColourId=Enum.Colours.DarkBlue,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=7,primaryColourId=Enum.Colours.Red,secondaryColourId=Enum.Colours.Yellow,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=8,primaryColourId=Enum.Colours.Brown,secondaryColourId=Enum.Colours.LightBlue,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=9,primaryColourId=Enum.Colours.Green,secondaryColourId=Enum.Colours.DarkBlue,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=10,primaryColourId=Enum.Colours.Any,secondaryColourId=Enum.Colours.Any,payee=Enum.Payee.Single,price=3),
        RentCard(rentCardId=11,primaryColourId=Enum.Colours.Pink,secondaryColourId=Enum.Colours.Orange,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=12,primaryColourId=Enum.Colours.Brown,secondaryColourId=Enum.Colours.LightBlue,payee=Enum.Payee.All,price=1),
        RentCard(rentCardId=13,primaryColourId=Enum.Colours.Any,secondaryColourId=Enum.Colours.Any,payee=Enum.Payee.Single,price=3)
    ]
    return rentCards


def create_game_play_actions():
    game_play_actions = [
        GamePlayAction(gamePlayActionId=1,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Properties,actionType=None,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=2,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Cash,actionType=None,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=3,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Rent,actionType=None,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=4,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Rent,actionType=None,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.MustPlayDoubleTheRentMove,tradeTypes=None,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=5,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Rent,actionType=None,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.SingleRentPlayerPaymentRequiredMove,tradeTypes=Enum.TradeTypes.ValueTrade,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=6,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Rent,actionType=None,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.MultipleRentPlayerPaymentsRequiredMove,tradeTypes=Enum.TradeTypes.ValueTrade,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=7,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.House,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=8,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.House,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=9,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.Hotel,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=10,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.Hotel,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=11,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.PassGo,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.GainCardsMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=12,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.PassGo,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=13,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DoubleTheRent,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=14,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DoubleTheRent,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.SingleRentPlayerPaymentRequiredMove,tradeTypes=Enum.TradeTypes.ValueTrade,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=15,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DoubleTheRent,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.MultipleRentPlayerPaymentsRequiredMove,tradeTypes=Enum.TradeTypes.ValueTrade,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=16,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.ItsMyBirthday,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.MultiplePlayerPaymentsRequiredMove,tradeTypes=Enum.TradeTypes.ValueTrade,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=17,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.ItsMyBirthday,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=18,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DebtCollector,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.MultiplePlayerPaymentsRequiredMove,tradeTypes=Enum.TradeTypes.ValueTrade,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=19,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DebtCollector,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=20,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.JustSayNo,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.CancelActionMove,tradeTypes=None,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=21,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.JustSayNo,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=22,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.SlyDeal,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.SlyStealMove,tradeTypes=Enum.TradeTypes.PropertyTrade,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=23,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.SlyDeal,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=24,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.ForcedDeal,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.ForcedTradeMove,tradeTypes=Enum.TradeTypes.PropertyTrade,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=25,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.ForcedDeal,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=26,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DealBreaker,expectedGameCardLocation=Enum.GameCardLocationStatus.IsInPlay,moveClassification=Enum.ActionClassification.DealBreakerMove,tradeTypes=Enum.TradeTypes.PropertyTrade,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=27,currentGameCardLocation=Enum.GameCardLocationStatus.IsOnHand,cardType=Enum.CardTypes.Action,actionType=Enum.ActionTypes.DealBreaker,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnCashPile,moveClassification=Enum.ActionClassification.NoActionRequiredMove,tradeTypes=None),
        GamePlayAction(gamePlayActionId=28,currentGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,cardType=Enum.CardTypes.Properties,actionType=None,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,moveClassification=Enum.ActionClassification.RotatingCardMove,tradeTypes=None,isPreCheckRequired=True),
        GamePlayAction(gamePlayActionId=29,currentGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,cardType=Enum.CardTypes.Properties,actionType=None,expectedGameCardLocation=Enum.GameCardLocationStatus.IsPlayedOnPropertyPile,moveClassification=Enum.ActionClassification.MovePropertyCardMove,tradeTypes=None,isPreCheckRequired=True)
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
                    cards.append(Cards(cardId=cardId,cardType=Enum.CardTypes.Action,actionCardId=actionCard.actionCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index]
            elif selected_group == 2:
                if len(propertiesCards)>0:
                    propertiesCard=propertiesCards.pop(0)
                    cards.append(Cards(cardId=cardId,cardType=Enum.CardTypes.Properties,propertiesCardId=propertiesCard.propertiesCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index]
            elif selected_group == 3:
                if len(cashCards)>0:
                    cashCard=cashCards.pop(0)
                    cards.append(Cards(cardId=cardId,cardType=Enum.CardTypes.Cash,cashCardId=cashCard.cashCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index] 
            elif selected_group == 4:
                if len(rentCards)>0:
                    rentCard=rentCards.pop(0)
                    cards.append(Cards(cardId=cardId,cardType=Enum.CardTypes.Rent,rentCardId=rentCard.rentCardId))
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