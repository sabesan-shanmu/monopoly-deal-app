from monopoly import create_app
from monopoly.models import ActionCard,PropertiesCard,RentCard,CashCard,Cards
from monopoly.common.enums import CardTypes,Colours,ActionTypes,Payee
from monopoly import db
import random 

""" 
Purpose:Script for initial creating card data 
"""


def create_action_cards():
    actionCards =[
        ActionCard(actionCardId=1,name="It's My Birthday",price=2,actionType=ActionTypes.ItsMyBirthday),
        ActionCard(actionCardId=2,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=3,name="Debt Collector",price=3,actionType=ActionTypes.DebtCollector),
        ActionCard(actionCardId=4,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=5,name="Debt Collector",price=3,actionType=ActionTypes.DebtCollector),
        ActionCard(actionCardId=6,name="Just Say No",price=4,actionType=ActionTypes.JustSayNo),
        ActionCard(actionCardId=7,name="Just Say No",price=4,actionType=ActionTypes.JustSayNo),
        ActionCard(actionCardId=8,name="Deal Breaker",price=5,actionType=ActionTypes.DealBreaker),
        ActionCard(actionCardId=9,name="House",price=3,actionType=ActionTypes.House),
        ActionCard(actionCardId=10,name="Deal Breaker",price=5,actionType=ActionTypes.DealBreaker),
        ActionCard(actionCardId=11,name="Forced Deal",price=3,actionType=ActionTypes.ForcedDeal),
        ActionCard(actionCardId=12,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=13,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=14,name="Just Say No",price=4,actionType=ActionTypes.JustSayNo),
        ActionCard(actionCardId=15,name="Double The Rent",price=1,actionType=ActionTypes.DoubleTheRent),
        ActionCard(actionCardId=16,name="Hotel",price=4,actionType=ActionTypes.Hotel),
        ActionCard(actionCardId=17,name="Forced Deal",price=3,actionType=ActionTypes.ForcedDeal),
        ActionCard(actionCardId=18,name="It's My Birthday",price=2,actionType=ActionTypes.ItsMyBirthday),
        ActionCard(actionCardId=19,name="It's My Birthday",price=2,actionType=ActionTypes.ItsMyBirthday),
        ActionCard(actionCardId=20,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=21,name="Sly Deal",price=3,actionType=ActionTypes.SlyDeal),
        ActionCard(actionCardId=22,name="Forced Deal",price=3,actionType=ActionTypes.ForcedDeal),
        ActionCard(actionCardId=23,name="Debt Collector",price=3,actionType=ActionTypes.DebtCollector),
        ActionCard(actionCardId=24,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=25,name="Double The Rent",price=1,actionType=ActionTypes.DoubleTheRent),
        ActionCard(actionCardId=26,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=27,name="Sly Deal",price=3,actionType=ActionTypes.SlyDeal),
        ActionCard(actionCardId=28,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=29,name="House 3",price=3,actionType=ActionTypes.House),
        ActionCard(actionCardId=30,name="House 3",price=3,actionType=ActionTypes.House),
        ActionCard(actionCardId=31,name="Hotel 4",price=4,actionType=ActionTypes.Hotel),
        ActionCard(actionCardId=32,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=33,name="Pass Go",price=1,actionType=ActionTypes.PassGo),
        ActionCard(actionCardId=34,name="Sly Deal",price=3,actionType=ActionTypes.SlyDeal)
    ]
    return actionCards

def create_properties_card():
    propertiesCards = [
        PropertiesCard(propertiesCardId=1,name="Baltic Aveue",primaryColourId=Colours.Brown,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=2,name="Property Wild Card",primaryColourId=Colours.Brown,secondaryColourId=Colours.LightBlue,price=1),
        PropertiesCard(propertiesCardId=4,name="Property Wild Card",primaryColourId=Colours.Green,secondaryColourId=Colours.Black,price=4),
        PropertiesCard(propertiesCardId=5,name="Oriental Avenue",primaryColourId=Colours.LightBlue,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=6,name="Mediterranean Avenue",primaryColourId=Colours.Brown,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=7,name="Property Wild Card",primaryColourId=Colours.Orange,secondaryColourId=Colours.Pink,price=2),
        PropertiesCard(propertiesCardId=8,name="Property Wild Card",primaryColourId=Colours.Red,secondaryColourId=Colours.Yellow,price=3),
        PropertiesCard(propertiesCardId=9,name="Electric Company",primaryColourId=Colours.Neutral,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=10,name="New York Avenue",primaryColourId=Colours.Orange,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=11,name="St. James Place",primaryColourId=Colours.Orange,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=12,name="Connecticut Avenue",primaryColourId=Colours.LightBlue,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=13,name="Property Wild Card",primaryColourId=Colours.Green,secondaryColourId=Colours.DarkBlue,price=4),
        PropertiesCard(propertiesCardId=14,name="Park Place",primaryColourId=Colours.DarkBlue,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=15,name="Boardwalk",primaryColourId=Colours.DarkBlue,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=16,name="Property Wild Card",primaryColourId=Colours.Any,secondaryColourId=None,price=0),
        PropertiesCard(propertiesCardId=17,name="Property Wild Card",primaryColourId=Colours.Any,secondaryColourId=None,price=0),
        PropertiesCard(propertiesCardId=18,name="Tennessee Avenue",primaryColourId=Colours.Orange,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=19,name="St. Charles Place",primaryColourId=Colours.Pink,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=20,name="Short Line",primaryColourId=Colours.Black,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=21,name="Pennsylvania Railroad",primaryColourId=Colours.Black,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=22,name="North Carolina Avenue",primaryColourId=Colours.Green,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=23,name="Property Wild Card",primaryColourId=Colours.Black,secondaryColourId=Colours.LightBlue,price=4),
        PropertiesCard(propertiesCardId=24,name="Ventnor Avenue",primaryColourId=Colours.Yellow,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=25,name="Reading Railroad",primaryColourId=Colours.Black,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=26,name="Atlantic Avenue",primaryColourId=Colours.Yellow,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=27,name="Property Wild Card",primaryColourId=Colours.Pink,secondaryColourId=Colours.Orange,price=2),
        PropertiesCard(propertiesCardId=28,name="Water Works",primaryColourId=Colours.Neutral,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=29,name="States Avenue",primaryColourId=Colours.Pink,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=30,name="Marvin Gardens",primaryColourId=Colours.Yellow,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=31,name="Pennsylvania Avenue",primaryColourId=Colours.Green,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=32,name="Pacific Avenue",primaryColourId=Colours.Green,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=33,name="Virginia Avenue",primaryColourId=Colours.Pink,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=34,name="Illinois Avenue",primaryColourId=Colours.Red,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=35,name="Property Wild Card",primaryColourId=Colours.Red,secondaryColourId=Colours.Yellow,price=3),
        PropertiesCard(propertiesCardId=36,name="Indiana Avenue",primaryColourId=Colours.Red,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=37,name="Property Wild Card",primaryColourId=Colours.Neutral,secondaryColourId=Colours.Black,price=2),
        PropertiesCard(propertiesCardId=38,name="Kentucky Avenue",primaryColourId=Colours.Red,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=39,name="Vermont Avenue",primaryColourId=Colours.LightBlue,secondaryColourId=None,price=1)
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
        RentCard(rentCardId=1,primaryColourId=Colours.Black,secondaryColourId=Colours.Neutral,payee=Payee.All),
        RentCard(rentCardId=2,primaryColourId=Colours.Any,secondaryColourId=Colours.Any,payee=Payee.Single),
        RentCard(rentCardId=3,primaryColourId=Colours.Pink,secondaryColourId=Colours.Orange,payee=Payee.All),
        RentCard(rentCardId=4,primaryColourId=Colours.Red,secondaryColourId=Colours.Yellow,payee=Payee.All),
        RentCard(rentCardId=5,primaryColourId=Colours.Black,secondaryColourId=Colours.Neutral,payee=Payee.All),
        RentCard(rentCardId=6,primaryColourId=Colours.Green,secondaryColourId=Colours.DarkBlue,payee=Payee.All),
        RentCard(rentCardId=7,primaryColourId=Colours.Red,secondaryColourId=Colours.Yellow,payee=Payee.All),
        RentCard(rentCardId=8,primaryColourId=Colours.Brown,secondaryColourId=Colours.LightBlue,payee=Payee.All),
        RentCard(rentCardId=9,primaryColourId=Colours.Green,secondaryColourId=Colours.DarkBlue,payee=Payee.All),
        RentCard(rentCardId=10,primaryColourId=Colours.Any,secondaryColourId=Colours.Any,payee=Payee.Single),
        RentCard(rentCardId=11,primaryColourId=Colours.Pink,secondaryColourId=Colours.Orange,payee=Payee.All),
        RentCard(rentCardId=12,primaryColourId=Colours.Brown,secondaryColourId=Colours.LightBlue,payee=Payee.All),
        RentCard(rentCardId=13,primaryColourId=Colours.Any,secondaryColourId=Colours.Any,payee=Payee.Single)
    ]
    return rentCards

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
        


        while True:
            selected_index = random.randint(0,len(group_number_list)-1)
            selected_group = group_number_list[selected_index]

            if selected_group == 1:
                if len(actionCards)>0:
                    actionCard=actionCards.pop(0)
                    cards.append(Cards(cardId=cardId,cardType=CardTypes.Action,actionCardId=actionCard.actionCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index]
            elif selected_group == 2:
                if len(propertiesCards)>0:
                    propertiesCard=propertiesCards.pop(0)
                    cards.append(Cards(cardId=cardId,cardType=CardTypes.Properties,propertiesCardId=propertiesCard.propertiesCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index]
            elif selected_group == 3:
                if len(cashCards)>0:
                    cashCard=cashCards.pop(0)
                    cards.append(Cards(cardId=cardId,cardType=CardTypes.Cash,cashCardId=cashCard.cashCardId))
                    cardId+=1
                else:
                    del group_number_list[selected_index] 
            elif selected_group == 4:
                if len(rentCards)>0:
                    rentCard=rentCards.pop(0)
                    cards.append(Cards(cardId=cardId,cardType=CardTypes.Rent,rentCardId=rentCard.rentCardId))
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
            db.session.commit()
        except Exception as error:
            print(error)
            db.session.rollback()
    
        try:
            db.session.bulk_save_objects(actionCards)
            db.session.bulk_save_objects(propertiesCards)
            db.session.bulk_save_objects(cashCards)
            db.session.bulk_save_objects(rentCards)
            db.session.bulk_save_objects(cards)
            db.session.commit() 
        except Exception as error:
            print(error)
            db.session.rollback()
        
if __name__ == '__main__':
    create_card()