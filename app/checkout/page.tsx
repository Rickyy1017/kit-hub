'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../../components/Header';
import toast from 'react-hot-toast';

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const nigerianLGAs: { [key: string]: string[] } = {
  'Abia': ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma', 'Ugwunagbo', 'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'],
  'Adamawa': ['Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Guyuk', 'Hong', 'Jada', 'Lamurde', 'Madagali', 'Maiha', 'Mayo-Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan', 'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South'],
  'Akwa Ibom': ['Abak', 'Eastern Obolo', 'Eket', 'Esit Eket', 'Essien Udim', 'Etim Ekpo', 'Etinan', 'Ibeno', 'Ibesikpo Asutan', 'Ibiono Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene', 'Ini', 'Itu', 'Mbo', 'Mkpat Enin', 'Nsit Atai', 'Nsit Ibom', 'Nsit Ubium', 'Obot Akara', 'Okobo', 'Onna', 'Oron', 'Oruk Anam', 'Udung Uko', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 'Uyo'],
  'Anambra': ['Aguata', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North', 'Awka South', 'Ayamelum', 'Dunukofia', 'Ekwusigo', 'Idemili North', 'Idemili South', 'Ihiala', 'Njikoka', 'Nnewi North', 'Nnewi South', 'Ogbaru', 'Onitsha North', 'Onitsha South', 'Orumba North', 'Orumba South', 'Oyi'],
  'Bauchi': ['Alkaleri', 'Bauchi', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa', 'Giade', 'Itas/Gadau', 'Jama\'are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira', 'Tafawa Balewa', 'Toro', 'Warji', 'Zaki'],
  'Bayelsa': ['Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Yenagoa'],
  'Benue': ['Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West', 'Katsina-Ala', 'Konshisha', 'Kwande', 'Logo', 'Makurdi', 'Obi', 'Ogbadibo', 'Ohimini', 'Oju', 'Okpokwu', 'Otukpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'],
  'Borno': ['Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwa', 'Gubio', 'Guzamala', 'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kala/Balge', 'Konduga', 'Kukawa', 'Kwaya Kusar', 'Mafa', 'Magumeri', 'Maiduguri', 'Marte', 'Mobbar', 'Monguno', 'Ngala', 'Nganzai', 'Shani'],
  'Cross River': ['Abi', 'Akamkpa', 'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal', 'Calabar South', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja', 'Yakurr', 'Yala'],
  'Delta': ['Aniocha North', 'Aniocha South', 'Bomadi', 'Burutu', 'Ethiope East', 'Ethiope West', 'Ika North East', 'Ika South', 'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West', 'Okpe', 'Oshimili North', 'Oshimili South', 'Patani', 'Sapele', 'Udu', 'Ughelli North', 'Ughelli South', 'Ukwuani', 'Uvwie', 'Warri North', 'Warri South', 'Warri South West'],
  'Ebonyi': ['Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South', 'Ikwo', 'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha'],
  'Edo': ['Akoko-Edo', 'Egor', 'Esan Central', 'Esan North-East', 'Esan South-East', 'Esan West', 'Etsako Central', 'Etsako East', 'Etsako West', 'Igueben', 'Ikpoba-Okha', 'Oredo', 'Orhionmwon', 'Ovia North-East', 'Ovia South-West', 'Owan East', 'Owan West', 'Uhunmwonde'],
  'Ekiti': ['Ado Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West', 'Emure', 'Gbonyin', 'Ido Osi', 'Ijero Ekiti', 'Ikere Ekiti', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun', 'Ise/Orun', 'Moba', 'Oye Ekiti'],
  'Enugu': ['Aninri', 'Awgu', 'Enugu East', 'Enugu North', 'Enugu South', 'Ezeagu', 'Igbo Etiti', 'Igbo Eze North', 'Igbo Eze South', 'Isi Uzo', 'Nkanu East', 'Nkanu West', 'Nsukka', 'Oji River', 'Udenu', 'Udi', 'Uzo-Uwani'],
  'FCT': ['Abaji', 'Abuja Municipal', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali'],
  'Gombe': ['Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Gombe', 'Kaltungo', 'Kwami', 'Nafada', 'Shongom', 'Yamaltu/Deba'],
  'Imo': ['Aboh Mbaise', 'Ahiazu Mbaise', 'Ehime Mbano', 'Ezinihitte', 'Ideato North', 'Ideato South', 'Ihitte/Uboma', 'Ikeduru', 'Isiala Mbano', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba', 'Nkwerre', 'Nwangele', 'Obowo', 'Oguta', 'Ohaji/Egbema', 'Okigwe', 'Onuimo', 'Orlu', 'Orsu', 'Oru East', 'Oru West', 'Owerri Municipal', 'Owerri North', 'Owerri West'],
  'Jigawa': ['Auyo', 'Babura', 'Biriniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 'Garki', 'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa', 'Kaugama', 'Kazaure', 'Kiri Kasama', 'Kiyawa', 'Maigatari', 'Malam Madori', 'Miga', 'Ringim', 'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'],
  'Kaduna': ['Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema\'a', 'Kachia', 'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'],
  'Kano': ['Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya', 'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa', 'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil'],
  'Katsina': ['Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dandume', 'Danja', 'Dan Musa', 'Daura', 'Dutsi', 'Dutsin Ma', 'Faskari', 'Funtua', 'Ingawa', 'Jibia', 'Kafur', 'Kaita', 'Kankara', 'Kankia', 'Katsina', 'Kurfi', 'Kusada', 'Mai\'Adua', 'Malumfashi', 'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa', 'Safana', 'Sandamu', 'Zango'],
  'Kebbi': ['Aleiro', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza', 'Dandi', 'Fakai', 'Gwandu', 'Jega', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski', 'Sakaba', 'Shanga', 'Suru', 'Wasagu/Danko', 'Yauri', 'Zuru'],
  'Kogi': ['Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah', 'Igalamela-Odolu', 'Ijumu', 'Kabba/Bunu', 'Kogi', 'Lokoja', 'Mopa-Muro', 'Ofu', 'Ogori/Magongo', 'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'],
  'Kwara': ['Asa', 'Baruten', 'Edu', 'Ekiti', 'Ifelodun', 'Ilorin East', 'Ilorin South', 'Ilorin West', 'Irepodun', 'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke Ero', 'Oyun', 'Pategi'],
  'Lagos': ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju/Lekki', 'Ifako-Ijaye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'],
  'Nasarawa': ['Akwanga', 'Awe', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia', 'Nasarawa', 'Nasarawa-Eggon', 'Obi', 'Toto', 'Wamba'],
  'Niger': ['Agaie', 'Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako', 'Gurara', 'Katcha', 'Kontagora', 'Lapai', 'Lavun', 'Magama', 'Mariga', 'Mashegu', 'Mokwa', 'Muya', 'Pailoro', 'Rafi', 'Rijau', 'Shiroro', 'Suleja', 'Tafa', 'Wushishi'],
  'Ogun': ['Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Egbado North', 'Egbado South', 'Ewekoro', 'Ifo', 'Ijebu East', 'Ijebu North', 'Ijebu North East', 'Ijebu Ode', 'Ikenne', 'Imeko Afon', 'Ipokia', 'Obafemi Owode', 'Odeda', 'Odogbolu', 'Ogun Waterside', 'Remo North', 'Shagamu'],
  'Ondo': ['Akoko North East', 'Akoko North West', 'Akoko South Akure East', 'Akoko South West', 'Akure North', 'Akure South', 'Ese Odo', 'Idanre', 'Ifedore', 'Ilaje', 'Ile Oluji/Okeigbo', 'Irele', 'Odigbo', 'Okitipupa', 'Ondo East', 'Ondo West', 'Ose', 'Owo'],
  'Osun': ['Aiyedade', 'Aiyedire', 'Atakumosa East', 'Atakumosa West', 'Boluwaduro', 'Boripe', 'Ede North', 'Ede South', 'Egbedore', 'Ejigbo', 'Ife Central', 'Ife East', 'Ife North', 'Ife South', 'Ifedayo', 'Ifelodun', 'Ila', 'Ilesha East', 'Ilesha West', 'Irepodun', 'Irewole', 'Isokan', 'Iwo', 'Obokun', 'Odo Otin', 'Ola Oluwa', 'Olorunda', 'Oriade', 'Orolu', 'Osogbo'],
  'Oyo': ['Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan Central', 'Ibadan North', 'Ibadan North West', 'Ibadan South East', 'Ibadan South West', 'Ibarapa Central', 'Ibarapa East', 'Ibarapa North', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa', 'Kajola', 'Lagelu', 'Ogbomosho North', 'Ogbomosho South', 'Ogo Oluwa', 'Olorunsogo', 'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 'Saki West', 'Surulere'],
  'Plateau': ['Barikin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South', 'Kanam', 'Kanke', 'Langtang North', 'Langtang South', 'Mangu', 'Mikang', 'Pankshin', 'Qua\'an Pan', 'Riyom', 'Shendam', 'Wase'],
  'Rivers': ['Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku Toru', 'Andoni', 'Asari-Toru', 'Bonny', 'Degema', 'Eleme', 'Emohua', 'Etche', 'Gokana', 'Ikwerre', 'Khana', 'Obio/Akpor', 'Ogba/Egbema/Ndoni', 'Ogu/Bolo', 'Okrika', 'Omumma', 'Opobo/Nkoro', 'Oyigbo', 'Port-Harcourt', 'Tai'],
  'Sokoto': ['Binji', 'Bodinga', 'Dange-Shnsi', 'Gada', 'Goronyo', 'Gudu', 'Gawabawa', 'Illela', 'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North', 'Sokoto South', 'Tambuwal', 'Tqngaza', 'Tureta', 'Wamako', 'Wurno', 'Yabo'],
  'Taraba': ['Ardo Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'Karim Lamido', 'Kurmi', 'Lau', 'Sardauna', 'Takum', 'Ussa', 'Wukari', 'Yorro', 'Zing'],
  'Yobe': ['Bade', 'Bursari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 'Jakusko', 'Karasuwa', 'Karawa', 'Machina', 'Nangere', 'Nguru', 'Potiskum', 'Tarmuwa', 'Yunusari', 'Yusufari'],
  'Zamfara': ['Anka', 'Bakura', 'Birnin Magaji', 'Bukkuyum', 'Bungudu', 'Gummi', 'Gusau', 'Kaura Namoda', 'Maradun', 'Maru', 'Shinkafi', 'Talata Mafara', 'Tsafe', 'Zurmi']
};

const nigerianAreas: { [key: string]: { [key: string]: string[] } } = {
  'Abia': {
    'Aba North': ['Aba Central', 'Ariaria', 'Eziukwu', 'Umuola', 'Umuogele'],
    'Aba South': ['Aba South Central', 'Ekeoha', 'Igwebuike', 'Ngwa', 'Umuocham'],
    'Arochukwu': ['Arochukwu Central', 'Ozu Abam', 'Ututu', 'Eleoha', 'Ihechiowa'],
    'Bende': ['Bende Central', 'Uzuakoli', 'Item', 'Alayi', 'Nkpa'],
    'Ikwuano': ['Ikwuano Central', 'Ariam', 'Usaka', 'Ibere', 'Oloko'],
    'Isiala Ngwa North': ['Isiala Ngwa North Central', 'Mbutu', 'Ngwa', 'Umuoha', 'Amaise'],
    'Isiala Ngwa South': ['Isiala Ngwa South Central', 'Ngwa', 'Mbutu', 'Amaise', 'Umuoha'],
    'Isuikwuato': ['Isuikwuato Central', 'Umuanyi', 'Ezere', 'Achara', 'Ogundu'],
    'Obi Ngwa': ['Obi Ngwa Central', 'Mgboko', 'Ngwa', 'Amaise', 'Umuoha'],
    'Ohafia': ['Ohafia Central', 'Ebem', 'Elu', 'Nkporo', 'Akanu'],
    'Osisioma': ['Osisioma Central', 'Umuobasi', 'Ngwa', 'Amaise', 'Umuoha'],
    'Ugwunagbo': ['Ugwunagbo Central', 'Ngwa', 'Amaise', 'Umuoha', 'Mbutu'],
    'Ukwa East': ['Ukwa East Central', 'Ngwa', 'Amaise', 'Umuoha', 'Mbutu'],
    'Ukwa West': ['Ukwa West Central', 'Ngwa', 'Amaise', 'Umuoha', 'Mbutu'],
    'Umuahia North': ['Umuahia North Central', 'Ngwa', 'Amaise', 'Umuoha', 'Mbutu'],
    'Umuahia South': ['Umuahia South Central', 'Ngwa', 'Amaise', 'Umuoha', 'Mbutu'],
    'Umu Nneochi': ['Umu Nneochi Central', 'Ngwa', 'Amaise', 'Umuoha', 'Mbutu']
  },
  'Adamawa': {
    'Demsa': ['Demsa Central', 'Bille', 'Dong', 'Gyawana', 'Kpasham'],
    'Fufore': ['Fufore Central', 'Pariya', 'Ribadu', 'Farang', 'Uba'],
    'Ganye': ['Ganye Central', 'Sugu', 'Jaggu', 'Timdore', 'Koffa'],
    'Girei': ['Girei Central', 'Modire', 'Tambo', 'Girei', 'Jada'],
    'Gombi': ['Gombi Central', 'Guyuk', 'Dukul', 'Bogga', 'Kiri'],
    'Guyuk': ['Guyuk Central', 'Banjiram', 'Kola', 'Shishi', 'Lokoro'],
    'Hong': ['Hong Central', 'Hushere', 'Zummo', 'Uba', 'Mayo Lope'],
    'Jada': ['Jada Central', 'Koma', 'Mayo Lamja', 'Mbulo', 'Yelli'],
    'Lamurde': ['Lamurde Central', 'Gyawana', 'Wuro Dole', 'Ngbakowo', 'Opalo'],
    'Madagali': ['Madagali Central', 'Kirchinga', 'Wuro Ngayandi', 'Sukur', 'Vulpi'],
    'Maiha': ['Maiha Central', 'Belel', 'Pakka', 'Sorau', 'Tambo'],
    'Mayo-Belwa': ['Mayo-Belwa Central', 'Bajabure', 'Bubong', 'Garu', 'Lassa'],
    'Michika': ['Michika Central', 'Koza', 'Munkav', 'Sina', 'Zummo'],
    'Mubi North': ['Mubi North Central', 'Bahuli', 'Digil', 'Mujara', 'Yelwa'],
    'Mubi South': ['Mubi South Central', 'Gella', 'Limankara', 'Muchalla', 'Sabon Fegi'],
    'Numan': ['Numan Central', 'Bare', 'Gamadio', 'Imburu', 'Kodomti'],
    'Shelleng': ['Shelleng Central', 'Gundo', 'Kiri', 'Libbo', 'Wuro Dole'],
    'Song': ['Song Central', 'Dirma', 'Dumne', 'Gudu Mboi', 'Kilange'],
    'Toungo': ['Toungo Central', 'Dawo', 'Gumti', 'Kiri', 'Toungo'],
    'Yola North': ['Yola North Central', 'Ajiya', 'Alkalawa', 'Nassarawo', 'Rumde'],
    'Yola South': ['Yola South Central', 'Bako', 'Girei', 'Luggere', 'Makoda']
  },
  'Akwa Ibom': {
    'Abak': ['Abak Central', 'Afaha Obong', 'Midim', 'Otoro', 'Ukanafun'],
    'Eastern Obolo': ['Eastern Obolo Central', 'Okoroete', 'Iko', 'Okoro Inyang', 'Iwo Oron'],
    'Eket': ['Eket Central', 'Ikot Abasi', 'Ikot Akpa Nkuk', 'Ikot Eket', 'Ikot Udo'],
    'Esit Eket': ['Esit Eket Central', 'Ikot Akpa Nkuk', 'Ikot Eket', 'Ikot Udo', 'Ikot Abasi'],
    'Essien Udim': ['Essien Udim Central', 'Ikot Ekpene', 'Ikot Obong', 'Ikot Udo', 'Ikot Abasi'],
    'Etim Ekpo': ['Etim Ekpo Central', 'Ikot Abasi', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Obong'],
    'Etinan': ['Etinan Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Ibeno': ['Ibeno Central', 'Ikot Abasi', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Obong'],
    'Ibesikpo Asutan': ['Ibesikpo Asutan Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Ibiono Ibom': ['Ibiono Ibom Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Ika': ['Ika Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Ikono': ['Ikono Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Ikot Abasi': ['Ikot Abasi Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Obong', 'Ikot Abasi'],
    'Ikot Ekpene': ['Ikot Ekpene Central', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong', 'Ikot Ekpene'],
    'Ini': ['Ini Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Itu': ['Itu Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Mbo': ['Mbo Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Mkpat Enin': ['Mkpat Enin Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Nsit Atai': ['Nsit Atai Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Nsit Ibom': ['Nsit Ibom Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Nsit Ubium': ['Nsit Ubium Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Obot Akara': ['Obot Akara Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Okobo': ['Okobo Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Onna': ['Onna Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Oron': ['Oron Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Oruk Anam': ['Oruk Anam Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Udung Uko': ['Udung Uko Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Ukanafun': ['Ukanafun Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Uruan': ['Uruan Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Urue-Offong/Oruko': ['Urue-Offong/Oruko Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong'],
    'Uyo': ['Uyo Central', 'Ikot Ekpene', 'Ikot Udo', 'Ikot Abasi', 'Ikot Obong']
  },
  'Anambra': {
    'Aguata': ['Aguata Central', 'Ekwulobia', 'Igbo-Ukwu', 'Nanka', 'Uga'],
    'Anambra East': ['Anambra East Central', 'Otuocha', 'Nando', 'Aguleri', 'Umuleri'],
    'Anambra West': ['Anambra West Central', 'Ifite-Anam', 'Ogbunike', 'Umuoba-Anam', 'Nnobi'],
    'Anaocha': ['Anaocha Central', 'Neni', 'Adazi', 'Akwaeze', 'Ichida'],
    'Awka North': ['Awka North Central', 'Achalla', 'Amansea', 'Isiagu', 'Mgbakwu'],
    'Awka South': ['Awka South Central', 'Amawbia', 'Ebenebe', 'Isiagu', 'Mgbakwu'],
    'Ayamelum': ['Ayamelum Central', 'Anaku', 'Ifite-Ogwari', 'Omasi', 'Umuoba-Anam'],
    'Dunukofia': ['Dunukofia Central', 'Ifitedunu', 'Ukpo', 'Umunachi', 'Umunze'],
    'Ekwusigo': ['Ekwusigo Central', 'Ozubulu', 'Oraifite', 'Ichi', 'Ihembosi'],
    'Idemili North': ['Idemili North Central', 'Abatete', 'Ogidi', 'Nawfia', 'Nkpor'],
    'Idemili South': ['Idemili South Central', 'Alor', 'Nnobi', 'Obosi', 'Ojoto'],
    'Ihiala': ['Ihiala Central', 'Lilu', 'Mbosi', 'Okija', 'Orsumoghu'],
    'Njikoka': ['Njikoka Central', 'Abagana', 'Enugwu-Ukwu', 'Nimo', 'Nawfia'],
    'Nnewi North': ['Nnewi North Central', 'Otolo', 'Uruagu', 'Umudim', 'Nnewi'],
    'Nnewi South': ['Nnewi South Central', 'Ukpor', 'Akwa', 'Ekwulumili', 'Nnewi'],
    'Ogbaru': ['Ogbaru Central', 'Atani', 'Ogbakuba', 'Odekpe', 'Ssugbe'],
    'Onitsha North': ['Onitsha North Central', 'Ogbaru', 'Odekpe', 'Ssugbe', 'Atani'],
    'Onitsha South': ['Onitsha South Central', 'Fegge', 'Gra', 'Odoakpu', 'Trans-Ekulu'],
    'Orumba North': ['Orumba North Central', 'Ajalli', 'Amaetiti', 'Amaokpala', 'Nanka'],
    'Orumba South': ['Orumba South Central', 'Ezira', 'Ihite', 'Isulo', 'Nanka'],
    'Oyi': ['Oyi Central', 'Awkuzu', 'Nteje', 'Ogbunike', 'Umunya']
  },
  'Bauchi': {
    'Alkaleri': ['Alkaleri Central', 'Dan Kwaro', 'Gwaram', 'Maimadi', 'Yanda'],
    'Bauchi': ['Bauchi Central', 'Dan Kwaro', 'Gwaram', 'Maimadi', 'Yanda'],
    'Bogoro': ['Bogoro Central', 'Boi', 'Bogoro', 'Duguri', 'Lusa'],
    'Damban': ['Damban Central', 'Damban', 'Gargawa', 'Gwaram', 'Zadawa'],
    'Darazo': ['Darazo Central', 'Darazo', 'Gabarin', 'Lari', 'Sade'],
    'Dass': ['Dass Central', 'Bagel', 'Dass', 'Gundale', 'Wandi'],
    'Gamawa': ['Gamawa Central', 'Alagarno', 'Gamawa', 'Gundale', 'Kubdiya'],
    'Ganjuwa': ['Ganjuwa Central', 'Ganjuwa', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Giade': ['Giade Central', 'Giade', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Itas/Gadau': ['Itas/Gadau Central', 'Itas', 'Gadau', 'Kafin Madaki', 'Kunchi'],
    'Jama\'are': ['Jama\'are Central', 'Jama\'are', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Katagum': ['Katagum Central', 'Azare', 'Katagum', 'Madangala', 'Tashena'],
    'Kirfi': ['Kirfi Central', 'Kirfi', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Misau': ['Misau Central', 'Misau', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Ningi': ['Ningi Central', 'Ningi', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Shira': ['Shira Central', 'Shira', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Tafawa Balewa': ['Tafawa Balewa Central', 'Bununu', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Toro': ['Toro Central', 'Toro', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Warji': ['Warji Central', 'Warji', 'Kafin Madaki', 'Kunchi', 'Nasarawa'],
    'Zaki': ['Zaki Central', 'Zaki', 'Kafin Madaki', 'Kunchi', 'Nasarawa']
  },
  'Bayelsa': {
    'Brass': ['Brass Central', 'Ewoama', 'Okpoama', 'Odioma', 'Twon-Brass'],
    'Ekeremor': ['Ekeremor Central', 'Aleibiri', 'Amassoma', 'Ekeremor', 'Oporoma'],
    'Kolokuma/Opokuma': ['Kolokuma/Opokuma Central', 'Kaiama', 'Kolokuma', 'Opokuma', 'Sampou'],
    'Nembe': ['Nembe Central', 'Bassambiri', 'Nembe', 'Ogbolomabiri', 'Okoroma'],
    'Ogbia': ['Ogbia Central', 'Anyama', 'Imiringi', 'Ogbia', 'Oloibiri'],
    'Sagbama': ['Sagbama Central', 'Angalabiri', 'Ebedebiri', 'Sagbama', 'Toru-Ebeni']
  },
  'Lagos': {
    'Agege': ['Agege Central', 'Iju', 'Orile Agege', 'Papa Uku', 'Shomolu'],
    'Ajeromi-Ifelodun': ['Ajeromi-Ifelodun Central', 'Ago Palace', 'Igbobi', 'Layeni', 'Tolu'],
    'Alimosho': ['Alimosho Central', 'Egbeda', 'Idimu', 'Ikotun', 'Isheri'],
    'Amuwo-Odofin': ['Amuwo-Odofin Central', 'Festac', 'Satellite Town', 'Trade Fair', 'Mile 2'],
    'Apapa': ['Apapa Central', 'Ijora', 'Olodi', 'Tincan', 'Warri'],
    'Badagry': ['Badagry Central', 'Ajara', 'Iworo', 'Posukoh', 'Seme'],
    'Epe': ['Epe Central', 'Agbowa', 'Ibeju', 'Lekki', 'Victoria Island'],
    'Eti-Osa': ['Eti-Osa Central', 'Ikoyi', 'Lekki', 'Victoria Island', 'Ajah'],
    'Ibeju/Lekki': ['Ibeju/Lekki Central', 'Akodo', 'Ibeju', 'Lekki', 'Orimedu'],
    'Ifako-Ijaye': ['Ifako-Ijaye Central', 'Iju', 'Shaga', 'Ajuwon', 'Ogba'],
    'Ikeja': ['Ikeja Central', 'Alausa', 'GRA', 'Opebi', 'Oregun'],
    'Ikorodu': ['Ikorodu Central', 'Bayeku', 'Ijede', 'Imota', 'Isiu'],
    'Kosofe': ['Kosofe Central', 'Agboyi', 'Ketu', 'Mile 12', 'Ojota'],
    'Lagos Island': ['Lagos Island Central', 'Marina', 'Obalende', 'Victoria Island', 'Idumota'],
    'Lagos Mainland': ['Lagos Mainland Central', 'Eko', 'Idumota', 'Oyingbo', 'Yaba'],
    'Mushin': ['Mushin Central', 'Ilupeju', 'Isolo', 'Odi-Olowo', 'Papa Ajao'],
    'Ojo': ['Ojo Central', 'Ajangbadi', 'Iba', 'Ijanikin', 'Otto'],
    'Oshodi-Isolo': ['Oshodi-Isolo Central', 'Ajao Estate', 'Isolo', 'Oshodi', 'Palmgrove'],
    'Shomolu': ['Shomolu Central', 'Bariga', 'Fola Agoro', 'Ilaje', 'Pedro'],
    'Surulere': ['Surulere Central', 'Adeniran Ogunsanya', 'Coker', 'Itire', 'Lawanson']
  }
};

interface PaystackPop {
  setup: (config: {
    key: string;
    email: string;
    amount: number;
    currency: string;
    ref: string;
    onClose: () => void;
    callback: (response: { reference: string }) => void;
  }) => { openIframe: () => void };
}

declare global {
  interface Window {
    PaystackPop: PaystackPop;
  }
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    area: '',
    paymentMethod: 'bank'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.state && !nigerianLGAs[formData.state].includes(formData.city)) {
      setFormData(prev => ({ ...prev, city: '' }));
    }
    if (formData.city && (!nigerianAreas[formData.state] || !nigerianAreas[formData.state][formData.city]?.includes(formData.area))) {
      setFormData(prev => ({ ...prev, area: '' }));
    }
  }, [formData.state, formData.city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment and create an order
    alert('Order placed successfully! Thank you for shopping with Kit-Hub.');
    clearCart();
  };

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: 'pk_test_e0bb4c5adc94a12fcb659c456c858e2b16ec3dfd',
      email: formData.email,
      amount: total * 100, // Paystack expects amount in kobo
      currency: 'NGN',
      ref: '' + Math.floor(Math.random() * 1000000000 + 1),
      onClose: function () {
        toast.error('Payment was not completed.');
      },
      callback: function (response: { reference: string }) {
        toast.success('Payment successful! Reference: ' + response.reference);
        clearCart();
      }
    });
    handler.openIframe();
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-text mb-4">Your cart is empty</h1>
            <p className="text-text-muted mb-8">Add some items to your cart before checking out.</p>
            <Link href="/" className="btn-primary px-6 py-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = state.total;
  const shipping = 2500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
              <h1 className="text-2xl font-bold text-text mb-6">Checkout</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold text-text mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-lg font-semibold text-text mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text mb-2">
                          State *
                        </label>
                        <select
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select State</option>
                          {nigerianStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text mb-2">
                          Local Government Area *
                        </label>
                        <select
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select LGA</option>
                          {formData.state && nigerianLGAs[formData.state]?.map((lga) => (
                            <option key={lga} value={lga}>
                              {lga}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text mb-2">
                          Neighborhood *
                        </label>
                        <select
                          name="area"
                          required
                          value={formData.area}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
                          disabled={!formData.city || !nigerianAreas[formData.state]?.[formData.city]}
                        >
                          <option value="">Select Neighborhood</option>
                          {formData.state && formData.city && nigerianAreas[formData.state]?.[formData.city]?.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-lg font-semibold text-text mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank"
                          checked={true}
                          readOnly
                          className="mr-3"
                        />
                        <span className="text-text font-medium">Bank Transfer</span>
                      </label>
                      <p className="text-sm text-blue-700 mt-2">
                        Please make payment to our bank account after placing your order. Our team will contact you with the bank details.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={payWithPaystack}
                  className="w-full btn-primary py-3 text-lg font-semibold"
                >
                  Pay Now - ₦{total.toLocaleString()}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 sticky top-8">
              <h2 className="text-xl font-bold text-text mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text truncate">{item.name}</p>
                      <p className="text-xs text-text-muted">Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-primary">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Subtotal:</span>
                  <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Shipping:</span>
                  <span className="font-semibold">₦{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total:</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
