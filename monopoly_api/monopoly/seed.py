from models import ActionCard,PropertiesCard,CashCard,RentCard,Cards
from common.enums import CardTypes
import random 


def create_action_cards():
    actionCards =[
        ActionCard(actionCardId=1,name="It's My Birthday",price=2,actionType=6),
        ActionCard(actionCardId=2,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=3,name="Debt Collector",price=3,actionType=5),
        ActionCard(actionCardId=4,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=5,name="Debt Collector",price=3,actionType=5),
        ActionCard(actionCardId=6,name="Just Say No",price=4,actionType=4),
        ActionCard(actionCardId=7,name="Just Say No",price=4,actionType=4),
        ActionCard(actionCardId=8,name="Deal Breaker",price=5,actionType=1),
        ActionCard(actionCardId=9,name="House",price=3,actionType=8),
        ActionCard(actionCardId=10,name="Deal Breaker",price=5,actionType=1),
        ActionCard(actionCardId=11,name="Forced Deal",price=3,actionType=2),
        ActionCard(actionCardId=12,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=13,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=14,name="Just Say No",price=4,actionType=4),
        ActionCard(actionCardId=15,name="Double The Rent",price=1,actionType=7),
        ActionCard(actionCardId=16,name="Hotel",price=4,actionType=9),
        ActionCard(actionCardId=17,name="Forced Deal",price=3,actionType=2 ),
        ActionCard(actionCardId=18,name="It's My Birthday",price=2,actionType=6),
        ActionCard(actionCardId=19,name="It's My Birthday",price=2,actionType=6),
        ActionCard(actionCardId=20,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=21,name="Sly Deal",price=3,actionType=3),
        ActionCard(actionCardId=22,name="Forced Deal",price=3,actionType=2),
        ActionCard(actionCardId=23,name="Debt Collector",price=3,actionType=5),
        ActionCard(actionCardId=24,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=25,name="Double The Rent",price=1,actionType=7),
        ActionCard(actionCardId=26,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=27,name="Sly Deal",price=3,actionType=3),
        ActionCard(actionCardId=28,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=29,name="House	3",price=3,actionType=8),
        ActionCard(actionCardId=30,name="House	3",price=3,actionType=8),
        ActionCard(actionCardId=31,name="Hotel	4",price=4,actionType=9),
        ActionCard(actionCardId=32,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=33,name="Pass Go",price=1,actionType=10),
        ActionCard(actionCardId=34,name="Sly Deal",price=3,actionType=3)
    ]
    return actionCards

def create_properties_card():
    propertiesCards = [
        PropertiesCard(propertiesCardId=1,name="Baltic Aveue",primaryColourId=2,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=2,name="Property Wild Card",primaryColourId=2,secondaryColourId=4,price=1),
        PropertiesCard(propertiesCardId=3,name="B. & O. Railroad",primaryColourId=7,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=4,name="Property Wild Card",primaryColourId=1,secondaryColourId=7,price=4),
        PropertiesCard(propertiesCardId=5,name="Oriental Avenue",primaryColourId=4,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=6,name="Mediterranean Avenue",primaryColourId=2,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=7,name="Property Wild Card",primaryColourId=5,secondaryColourId=11,price=2),
        PropertiesCard(propertiesCardId=8,name="Property Wild Card",primaryColourId=8,secondaryColourId=9,price=3),
        PropertiesCard(propertiesCardId=9,name="Electric Company",primaryColourId=10,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=10,name="New York Avenue",primaryColourId=5,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=11,name="St. James Place",primaryColourId=5,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=12,name="Connecticut Avenue",primaryColourId=4,secondaryColourId=None,price=1),
        PropertiesCard(propertiesCardId=13,name="Property Wild Card",primaryColourId=1,secondaryColourId=3,price=4),
        PropertiesCard(propertiesCardId=14,name="Park Place",primaryColourId=3,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=15,name="Boardwalk",primaryColourId=3,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=16,name="Property Wild Card",primaryColourId=0,secondaryColourId=None,price=0),
        PropertiesCard(propertiesCardId=17,name="Property Wild Card",primaryColourId=0,secondaryColourId=None,price=0),
        PropertiesCard(propertiesCardId=18,name="Tennessee Avenue",primaryColourId=5,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=19,name="St. Charles Place",primaryColourId=11,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=20,name="Short Line",primaryColourId=7,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=21,name="Pennsylvania Railroad",primaryColourId=7,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=22,name="North Carolina Avenue",primaryColourId=1,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=23,name="Property Wild Card",primaryColourId=7,secondaryColourId=4,price=4),
        PropertiesCard(propertiesCardId=24,name="Ventnor Avenue",primaryColourId=9,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=25,name="Reading Railroad",primaryColourId=7,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=26,name="Atlantic Avenue",primaryColourId=9,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=27,name="Property Wild Card",primaryColourId=11,secondaryColourId=5,price=2),
        PropertiesCard(propertiesCardId=28,name="Water Works",primaryColourId=10,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=29,name="States Avenue",primaryColourId=11,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=30,name="Marvin Gardens",primaryColourId=9,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=31,name="Pennsylvania Avenue",primaryColourId=1,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=32,name="Pacific Avenue",primaryColourId=1,secondaryColourId=None,price=4),
        PropertiesCard(propertiesCardId=33,name="Virginia Avenue",primaryColourId=11,secondaryColourId=None,price=2),
        PropertiesCard(propertiesCardId=34,name="Illinois Avenue",primaryColourId=8,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=35,name="Property Wild Card",primaryColourId=8,secondaryColourId=9,price=3),
        PropertiesCard(propertiesCardId=36,name="Indiana Avenue",primaryColourId=8,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=37,name="Property Wild Card",primaryColourId=10,secondaryColourId=7,price=2),
        PropertiesCard(propertiesCardId=38,name="Kentucky Avenue",primaryColourId=8,secondaryColourId=None,price=3),
        PropertiesCard(propertiesCardId=39,name="Vermont Avenue",primaryColourd=4,secondaryColourId=None,price=1)
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
        RentCard(rentCardId=1,primaryColourId=7,secondaryColourId=10,payee=2),
        RentCard(rentCardId=2,primaryColourId=0,secondaryColourId=0,payee=1),
        RentCard(rentCardId=3,primaryColourId=11,secondaryColourId=5,payee=2),
        RentCard(rentCardId=4,primaryColourId=8,secondaryColourId=9,payee=2),
        RentCard(rentCardId=5,primaryColourId=7,secondaryColourId=10,payee=2),
        RentCard(rentCardId=6,primaryColourId=1,secondaryColourId=3,payee=2),
        RentCard(rentCardId=7,primaryColourId=8,secondaryColourId=9,payee=2),
        RentCard(rentCardId=8,primaryColourId=2,secondaryColourId=4,payee=2),
        RentCard(rentCardId=9,primaryColourId=1,secondaryColourId=3,payee=2),
        RentCard(rentCardId=10,primaryColourId=0,secondaryColourId=0,payee=1),
        RentCard(rentCardId=11,primaryColourId=11,secondaryColourId=5,payee=2),
        RentCard(rentCardId=12,primaryColourId=2,secondaryColourId=4,payee=2),
        RentCard(rentCardId=13,primaryColourId=0,secondaryColourId=0,payee=1)
    ]
    return rentCards

def create_card():
    #clear database
    Cards.query.delete()
    cards=[]
    cardId=0
    group_number_list=[1,2,3,4]

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
                cards.append(Cards(cardId=cardId,cardType=CardTypes.Action.value,actionCardId=actionCard.actionCardId))
            else:
                del group_number_list[selected_index]
        elif selected_group == 2:
            if len(propertiesCards)>0:
                propertiesCard=propertiesCards.pop(0)
                cards.append(Cards(cardId=cardId,cardType=CardTypes.Properties.value,propertiesCardId=propertiesCard.propertiesCardId))
            else:
                del group_number_list[selected_index]
        elif selected_group == 3:
            if len(cashCards)>0:
                cashCard=cashCards.pop(0)
                cards.append(Cards(cardId=cardId,cardType=CardTypes.Cash.value,cashCardId=cashCard.cashCardId))
            else:
                del group_number_list[selected_index] 
        elif selected_group == 4:
            if len(rentCards)>0:
                rentCard=rentCards.pop(0)
                cards.append(Cards(cardId=cardId,cardType=CardTypes.Rent.value,rentCardId=rentCard.rentCardId))
            else:
                del group_number_list[selected_index] 

        if len(group_number_list) == 0:
            break
   
    print(len(cards))
