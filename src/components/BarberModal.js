import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

//api
import Api from '../Api';

//svgs
import ExpandIcon from '../assets/expand.svg';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';

const Modal = styled.Modal `

`;

const ModalArea = styled.View `
    flex:1;
    background-color:rgba(0,0,0,0.5);
    justify-content:flex-end;
`;

const ModalBody = styled.View `
    background-color:#89D6E3;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    min-height:300px;
    padding:10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity `
    width:40px;
    height:40px;
`;

const ModalItem = styled.View `
    background-color:#FFF;
    border-radius:10px;
    margin-bottom:15px;
    padding:10px;
`;

const UserInfo = styled.View `
    flex-direction:row;
    align-items:center;
`;

const UserAvatar = styled.Image `
    width:56px;
    height:56px;
    border-radius:20px;
    margin-right:15px;
`;

const UserName = styled.Text `
    color:#000;
    font-size:18px;
    font-weight:bold;
`;

const ServiceInfo = styled.View `
    flex-direction: row;
    justify-content:space-between;

`;

const ServiceName = styled.Text `
    font-size:16px;
    font-weight:bold;
`;

const ServicePrice = styled.Text `
    font-size:16px;
    font-weight:bold;
`;

export const FinishButton = styled.TouchableOpacity `
    background-color:#268596;
    height:60px;
    justify-content:center;
    align-items:center;
    border-radius:10px;
`;

export const FinishButtonText = styled.Text `
    color:#FFF;
    font-size:17px;
    font-weight:bold;
`;

export const DateInfo = styled.View `
    flex-direction: row;
`;
export const DatePrevArea = styled.TouchableOpacity `
    flex:1;
    justify-content:flex-end;
    align-items:flex-end;
`;

export const DateTitleArea = styled.View `
    width:150px;
    justify-content:center;
    align-items:center;
`;

export const DateTitle = styled.Text `
    font-size:17px;
    font-weight:bold;
    color:#000;
`;

export const DateNextArea = styled.TouchableOpacity `
    flex:1;
    align-items:flex-start;
`;

export const DateList = styled.ScrollView `

`;

const DateItem = styled.TouchableOpacity `
    width:45px;
    justify-content:center;
    align-items:center;
    border-radius:10px;
    padding-top:5px;
    padding-bottom:5px;
`;

const DateItemWeekday = styled.Text `
    font-size:16px;
    font-weight:bold;
`;

const DateItemNumber = styled.Text `
    font-size:16px;
    font-weight:bold;
`;

export const TimeList = styled.ScrollView `

`;

export const TimeItem = styled.TouchableOpacity `
    width:75px;
    height:40px;
    justify-content:center;
    align-items:center;
    border-radius:10px;
`;

export const TimeItemText = styled.Text `
    font-size:16px;
    font-weight:bold;
`;

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Setembro',
    'Outubro',
    'Novemmbro',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
]

export default ({show, setShow, user, service}) => {

    const navigation = useNavigation();
    
    //states
    const [selectedYear, setSelectedYear ] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    //useEffect
    useEffect(()=>{
        if(user.available){
            let daysInMonth = new Date(selectedYear, selectedMonth +1, 0).getDate();
            let newListDays = [];

            for(let i=1; 1<=daysInMonth; i++){
                let d = new Date(selectedYear, selectedMonth, i);
                let year = d.getFullYear();
                let month = d.getMonth() +1;
                let day = d.getDate();
                month = month < 10 ? '0'+month : month;
                day = day < 10 ? '0'+day : day;
                let selDate = `${year}-${month}-${day}`
                

                let availability = user.available.filter(e=>e.date === selDate);

                newListDays.push({
                    status:availability.length > 0 ? true : false,
                    weekday: days[ d.getDay() ],
                    number:i
                });
            }
        
            setListDays(newListDays);
            setSelectedDay(0);
            setListHours([]);
            setSelectedHour(0);
        }
    }, [user ,selectedMonth, selectedYear]);

    useEffect(()=>{
        if(user.available && setSelectedDay > 0){
            let d = new Date(selectedYear, selectedMonth, setSelectedDay);
            let year = d.getFullYear();
            let month = d.getMonth() +1;
            let day = d.getDate();
            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;
            let selDate = `${year}-${month}-${day}`

            let availability = user.available.filter(e=>e.date === selDate);

            if(availability.length > 0) {
                setListHours(availability[0].hours)
            }
        }
        setSelectedHour(null);
    }, [user ,selectedDay])

    useEffect(()=>{
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());
    }, [])

    //functions
    const handleLeftDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleRightDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth());
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleCloseButton = () => {
        setShow(false);
    }

    const handleFinishClick = async () => {
        if(
            user.id &&
            service != null &&
            selectedYear > 0 &&
            slelectedMonth > 0 &&
            selectedDay > 0 &&
            selectedHour != null 
        ){
            // let res = await Api.setAppointment(
            // user.id,
            //     service,
            //     selectedYear,
            //     selectedMonth,
            //     selectedDay,
            //     selectedHour
            // );

            // if(res.error == ''){
            //     setShow(false);
            // }else{
            //     alert(res.error);
            //     navigation.navigate('Appointments');
            // }

             setShow(false);
             navigation.navigate('Appointments');

        }else{
            alert("Marque todos os campos!")
        }   
    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <ExpandIcon width="40" height="40"  fill="#000" />
                    </CloseButton>
                    
                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{uri: user.avatar}} />
                            <UserName> {user.name} </UserName>
                        </UserInfo>
                    </ModalItem>

                    {service != null &&
                        <ModalItem>
                            <ServiceInfo>
                                <ServiceName> {user.services[service].name} </ServiceName>
                                <ServicePrice> R$ {user.services[service].price.toFixed(2)} </ServicePrice>
                            </ServiceInfo>
                        </ModalItem>
                    }  

                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea  onPress={handleLeftDateClick}>
                                <NavPrevIcon width="35" height="35"  fill="#000"/>
                            </DatePrevArea>
                            <DateTitleArea>
                                <DateTitle> {months[selectedMonth -1]} {selectedYear}  </DateTitle>
                            </DateTitleArea>
                            <DateNextArea  onPress={handleRightDateClick}>
                                <NavNextIcon width="35" height="35"  fill="#000"/>
                            </DateNextArea>
                        </DateInfo>
                        <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
                            {listDays.map((item, key)=>(
                                <DateItem 
                                    key={key} 
                                    onPress={()=> item.status 
                                        ? selectedDay(item.number) 
                                        : null}
                                    style={{
                                        opacity:item.status ? 1 : 0.5,
                                        backgroundColor:item.number === selectedDay ? '#4EADBE' : '#FFF',
                                    }}
                                    >
                                        <DateItemWeekday
                                            style={{
                                                color:item.number === selectedDay ? '#FFF' : '#000'
                                            }}
                                        >
                                             {item.weekday} 
                                        </DateItemWeekday>
                                        <DateItemNumber
                                            style={{
                                                color:item.number === selectedDay ? '#000' : '#FFF'
                                            }}
                                        >
                                            { item.number }
                                        </DateItemNumber>
                                </DateItem>
                            ))}
                        </DateList>
                    </ModalItem>

                    {selectedDay > 0 && listHours.length > 0 &&
                        <ModalItem>
                            <TimeList horizontal={true} showsHorizontalScrollIndicator={false}>
                                {listHours.map((item, key)=> (
                                    <TimeItem 
                                        key={key}
                                        onPress={()=>setSelectedHour(item)}
                                        style={{
                                            backgroundColor:item === selectedHour ? '#4EADBE' : '#FFF'
                                        }}
                                    >
                                        <TimeItemText
                                            style={{
                                                color:item === selectedHour ? '#FFF' : '#000',
                                                fontweight: item === selectedHour ? 'bold' : 'normal'
                                            }}
                                        > 
                                            {item} 
                                        </TimeItemText>
                                    </TimeItem>
                                ))}
                            </TimeList>
                        </ModalItem>
                    }
                    <FinishButton onPress={handleFinishClick}>
                        <FinishButtonText>Finalizar agendamento</FinishButtonText>
                    </FinishButton>

                </ModalBody>
            </ModalArea>

        </Modal>
    )
}