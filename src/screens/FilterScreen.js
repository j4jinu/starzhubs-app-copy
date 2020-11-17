import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import { ScrollView } from 'react-native-gesture-handler';
// import MultiSelectView from 'react-native-multiselect-view'
// import CustomMultiPicker from "react-native-multiple-select-list";
// import MultiSelect from 'react-native-multiple-select';
import { Snackbar } from 'react-native-paper';
import { AuthContext } from '../context/authContext';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Checkbox } from 'react-native-paper';
import RangeSlider from 'rn-range-slider';
const industryNames = [
  {
    name: 'Industry',
    id: 0,
    children: [
      {
        id: 'Assameese',
        name: 'Assameese',
      },
      {
        id: 'Bengali',
        name: 'Bengali',
      },
      {
        id: 'Gujarathi',
        name: 'Gujarathi',
      },
      {
        id: 'Hindi',
        name: 'Hindi',
      },
      {
        id: 'Kannada',
        name: 'Kannada',
      },
      {
        id: 'Malayalam',
        name: 'Malayalam',
      },
      {
        id: 'Marathi',
        name: 'Marathi',
      },
      {
        id: 'Punjabi',
        name: 'Punjabi',
      },
      {
        id: 'Tamil',
        name: 'Tamil',
      },
      {
        id: 'Telugu',
        name: 'Telugu',
      },
    ]
  }]


const FilterScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);

  const [ageFromValue, setAgeFromValue] = useState(0);
  const [ageToValue, setAgeToValue] = useState(0);

  const [heightFromValue, setHeightFromValue] = useState(0);
  const [heightToValue, setHeightToValue] = useState(0);
  const [weightFromValue, setWeightFromValue] = useState(0);
  const [weightToValue, setWeightToValue] = useState(0);

  const [isDark, setDark] = useState(false);
  const [isBrown, setBrown] = useState(false);
  const [isWheatish, setWheatish] = useState(false);
  const [isFair, setFair] = useState(false);

  const [isFit, setFit] = useState(false);
  const [isAthletic, setAthletic] = useState(false);
  const [isHourglass, setHourglass] = useState(false);
  const [isSlim, setSlim] = useState(false);
  const [isFatty, setFatty] = useState(false);
  const [isAverageBuild, setAverageBuild] = useState(false);

  const [isFemale, setFemale] = useState(false);
  const [isMale, setMale] = useState(false);
  const [isOthers, setOthers] = useState(false);

  const [categories, setCategories] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [isActor, setActor] = useState(false)
  const [gender, setGender] = useState([])
  const [skinTone, setSkinTone] = useState([])
  const [bodyType, setBodyType] = useState([])

  const [isCategoryOn, setCategoryOn] = useState(false)
  const [isGenderOn, setGenderOn] = useState(false)
  const [isBodyTypeOn, setBodyTypeOn] = useState(false)
  const [isSkinToneOn, setSkinToneOn] = useState(false)

  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const getCategory = () => {
      fetch("http://13.232.190.226/api/category", {
        method: 'GET'
      })
        .then(response => response.json())
        .then(response => {
          setCategories(response.categories)
          console.log("filetr", response.categories);
          // setIsLoading(false)
          // setTalentId(response.categories[0]._id)
        })
        .catch(error => {
          // setIsLoading(false)
        });
    }
    getCategory()
  }, [])


  const onSelectedItemsChange = selectedItem => {
    setSelectedItems(selectedItem)
    if (selectedItems === []) { setCategoryOn(true) } else { setCategoryOn(false) }
    // if(selectedItem == '5f5b2b8e96b2173a30948ac6'){
    //   setActor(!isActor)
    // }
  };

  const handleGender = (gnder) => {
    const gndr = [...gender]
    const currentIndex = gender.indexOf(gnder)
    if (currentIndex === -1) {
      gndr.push(gnder);
    } else {
      gndr.splice(currentIndex, 1);
    }
    setGender(gndr);
    if (gender === []) { setGenderOn(true) } else { setGenderOn(false) }
  }

  const handleskinTone = (skin) => {
    const skintone = [...skinTone]
    const currentIndex = skinTone.indexOf(skin)
    if (currentIndex === -1) {
      skintone.push(skin);
    } else {
      skintone.splice(currentIndex, 1);
    }
    setSkinTone(skintone);
    if (skinTone === []) { setSkinToneOn(true) } else { setSkinToneOn(false) }
  };

  const handleBodyType = (btype) => {
    const bdtype = [...bodyType]
    const currentIndex = bodyType.indexOf(btype)
    if (currentIndex === -1) {
      bdtype.push(btype);
    } else {
      bdtype.splice(currentIndex, 1);
    }
    setBodyType(bdtype);
    if (bodyType === []) { setBodyTypeOn(true) } else { setBodyTypeOn(false) }
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) { setCategoryOn(true) } else { setCategoryOn(false) }
    if (gender.length === 0) { setGenderOn(true) } else { setGenderOn(false) }
    selectedItems.forEach(element => {
      if (element === "5f5b2b8e96b2173a30948ac6" || element === '5f5b2b9c96b2173a30948ac7') {
        if (bodyType.length === 0) { setBodyTypeOn(true) } else { setBodyTypeOn(false) }
        if (skinTone.length === 0) { setSkinToneOn(true) } else { setSkinToneOn(false) }
      }
    })
    const minHeight = heightFromValue
    const maxHeight = heightToValue
    const minWeight = weightFromValue
    const maxWeight = weightToValue
    const minAge = ageFromValue
    const maxAge = ageToValue
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + auth.token
      },
      body: JSON.stringify({
        minAge: minAge,
        maxAge: maxAge,
        minHeight: minHeight,
        maxHeight: maxHeight,
        minWeight: minWeight,
        maxWeight: maxWeight,
        talents: selectedItems,
        gender: gender,
        complexion: skinTone,
        bodyType: bodyType
      })
    }
    fetch(`http://13.232.190.226/api/talent/filter`, requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.success === true) {
          console.warn(response.data.users);
          navigation.navigate('Filter', {
            filter: response.data.users
          })
        } else {
          setVisible(!visible);
        }
      },
        (error) => {
        })
  }

  const onDismissSnackBar = () => {
    setVisible(false);
  };


  return (
    <ScrollView>
      <Snackbar visible={visible} duration={5000} onDismiss={onDismissSnackBar}>	No Users Found !</Snackbar>
      <View>
        <Text style={{ color: "#663300", fontWeight: "bold", marginLeft: "5%", marginTop: "7%", fontSize: 15, marginBottom: "3%" }}> Category</Text>
        <View style={{ width: '100%', justifyContent: 'center' }}	>
          <SectionedMultiSelect
            items={industryNames}
            IconRenderer={Icon}
            uniqueKey="id"
            subKey="children"
            selectText="Select Industry"
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
          />
        </View>

        {/* <View style={{marginHorizontal:'5%'}}>
				<MultiSelect
          hideTags
          items={categories}
          uniqueKey="_id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Select Category"
          // searchInputPlaceholderText="Search Items..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#222"
          selectedItemTextColor="orange"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="title"
          searchInputStyle={{ color: '#CCC'}}
          submitButtonColor="orange"
          submitButtonText="Submit"
          styleDropdownMenuSubsection={{paddingLeft:'3%', borderRadius:5, elevation:4}}
				/>
      </View> */}
        {isCategoryOn && (
          <Text style={{ fontSize: 13, color: 'red', alignSelf: 'center', marginTop: 1, }}>Select atleast one category</Text>
        )}

        {/* {categories !== undefined ? categories.map(cat => (
          <View style={{width:"0%"}}>
            <View style={{flexDirection:"row"}}>
              <CheckBox 
              disabled={false}
              // value={isSelectedone}
              // onValueChange={setSelectionone}
              tintColors={{ true: 'orange'}}
              /> 
              <Text style={{color:"orange",marginLeft:"1%",marginTop:"1%"}}> {cat.title}</Text> 
            </View>
          </View>
        )): null} */}

        <Text style={{ color: "#663300", fontWeight: "bold", marginLeft: "5%", marginTop: "3%", fontSize: 15, marginBottom: "3%" }}>Gender</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={isFemale ? styles.active : styles.inactive} onPress={() => { setFemale(!isFemale); handleGender('Female') }}>
            <Text style={isFemale ? styles.fontactive : styles.fontinactive}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity style={isMale ? styles.active : styles.inactive} onPress={() => { setMale(!isMale); handleGender('Male') }}>
            <Text style={isMale ? styles.fontactive : styles.fontinactive}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={isOthers ? styles.active : styles.inactive} onPress={() => { setOthers(!isOthers); handleGender('Transgender') }}>
            <Text style={isOthers ? styles.fontactive : styles.fontinactive}>Others</Text>
          </TouchableOpacity>
        </View>
        {isGenderOn && (
          <Text style={{ fontSize: 13, color: 'red', alignSelf: 'center', marginTop: 1, }}>Select atleast one gender</Text>
        )}

        <Text style={{ color: "#663300", fontWeight: "bold", marginLeft: "5%", marginTop: "3%", fontSize: 15, marginBottom: "3%" }}>Age</Text>
        <View style={{ marginTop: "-5%" }}>
          <RangeSlider
            minValue={1}
            maxValue={100}
            tintColor={'#da0f22'}
            handleBorderWidth={1}
            handleBorderColor="#454d55"
            selectedMinimum={20}
            selectedMaximum={40}
            style={{ flex: 1, height: 70, padding: 10, backgroundColor: '#ddd' }}
            onChange={(data) => { console.log(data); }}
          />
          {/* <RangeSlider min={1} max={100}
          fromValueOnChange={value => setAgeFromValue(value)}
          toValueOnChange={value => setAgeToValue(value)}
          initialFromValue={11}
          inRangeBarColor='orange'
          fromKnobColor='orange'
          toKnobColor='orange'
          styleSize={12}
          showRangeLabels={false}
        /> */}
        </View>

        {/* {isActor?(
      <> */}
        {/* <Text style={{color:"#663300",fontWeight:"bold",marginLeft:"5%",marginTop:"-10%",fontSize:15,marginBottom:"3%"}}>Height(cm)</Text>
      <View style={{marginTop:"-5%"}}>
        <RangeSlider min={100} max={250}
          fromValueOnChange={value => setHeightFromValue(value)}
          toValueOnChange={value => setHeightToValue(value)}
          initialFromValue={25}
          inRangeBarColor='orange'
          fromKnobColor='orange'
          toKnobColor='orange'
          styleSize={12}
          showRangeLabels={false}
          showValueLabels={true}
        />
      </View> */}

        {/* <Text style={{color:"#663300",fontWeight:"bold",marginLeft:"5%",marginTop:"-10%",fontSize:15,marginBottom:"3%"}}>Weight(Kg)</Text>
      <View style={{marginTop:"-5%"}}>
        <RangeSlider min={10} max={200}
          fromValueOnChange={value => setWeightFromValue(value)}
          toValueOnChange={value => setWeightToValue(value)}
          initialFromValue={30}
          inRangeBarColor='orange'
          fromKnobColor='orange'
          toKnobColor='orange'
          styleSize={12}
          showRangeLabels={false}
          showValueLabels={true}
        />
      </View> */}

        <Text style={{ color: "#663300", fontWeight: "bold", marginLeft: "5%", marginTop: "-10%", fontSize: 15, marginBottom: "3%" }}>Skin Tone</Text>
        <View style={{ flexDirection: "row", width: "100%", marginLeft: "5%" }}>
          <View style={{ width: "50%" }}>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isDark ? 'checked' : 'unchecked'}
                onPress={() => { setDark(!isDark); handleskinTone('Dark') }}
                color='orange'
              />
              {/* <CheckBox 
            disabled={false}
            value={isDark}
            onValueChange={()=>{setDark(!isDark);handleskinTone('Dark')}}
            tintColors={{ true: 'orange'}}
            />  */}
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}> Dark</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isBrown ? 'checked' : 'unchecked'}
                onPress={() => { setBrown(!isBrown); handleskinTone('Brown') }}
                color='orange'
              />
              {/* <CheckBox 
              disabled={false}
              value={isBrown}
              onValueChange={()=>{setBrown(!isBrown);handleskinTone('Brown')}}
              tintColors={{ true: 'orange'}}
            />  */}
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}>Brown</Text>
            </View>
          </View>
          <View style={{ width: "50%", marginLeft: "8%" }}>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isWheatish ? 'checked' : 'unchecked'}
                onPress={() => { setWheatish(!isWheatish); handleskinTone('Wheatish') }}
                color='orange'
              />
              {/* <CheckBox 
            disabled={false}
            value={isWheatish}
            onValueChange={()=>{setWheatish(!isWheatish);handleskinTone('Wheatish')}}
            tintColors={{ true: 'orange'}}
            />  */}
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}>Wheatish</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isFair ? 'checked' : 'unchecked'}
                onPress={() => { setFair(!isFair); handleskinTone('Fair') }}
                color='orange'
              />
              {/* <CheckBox 
              disabled={false}
              value={isFair}
              onValueChange={()=>{setFair(!isFair);handleskinTone('Fair')}}
              tintColors={{ true: 'orange'}}
            />  */}
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}>Fair</Text>
            </View>
          </View>
        </View>
        {isSkinToneOn && (
          <Text style={{ fontSize: 13, color: 'red', alignSelf: 'center', marginTop: 1, }}>Select skintone</Text>
        )}


        <Text style={{ color: "#663300", fontWeight: "bold", marginLeft: "5%", marginTop: "3%", fontSize: 15, marginBottom: "3%" }}>Body Tone</Text>
        <View style={{ flexDirection: "row", width: "100%", marginLeft: "5%" }}>
          <View style={{ width: "50%" }}>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isFit ? 'checked' : 'unchecked'}
                onPress={() => { setFit(!isFit); handleBodyType('Fit') }}
                color='orange'
              />
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}> Fit</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isHourglass ? 'checked' : 'unchecked'}
                onPress={() => { setHourglass(!isHourglass); handleBodyType('Hourglass') }}
                color='orange'
              />
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}>Hourglass</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isAverageBuild ? 'checked' : 'unchecked'}
                onPress={() => { setAverageBuild(!isAverageBuild); handleBodyType('Average Build') }}
                color='orange'
              />
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}> Average Build</Text>
            </View>
          </View>
          <View style={{ width: "50%", marginLeft: "8%" }}>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isSlim ? 'checked' : 'unchecked'}
                onPress={() => { setSlim(!isSlim); handleBodyType('Slim') }}
                color='orange'
              />
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}>Slim</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isFatty ? 'checked' : 'unchecked'}
                onPress={() => { setFatty(!isFatty); handleBodyType('Fatty') }}
                color='orange'
              />
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}>Fatty</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={isAthletic ? 'checked' : 'unchecked'}
                onPress={() => { setAthletic(!isAthletic); handleBodyType('Athletic') }}
                color='orange'
              />
              <Text style={{ color: "orange", marginLeft: "1%", marginTop: "6%" }}> Athletic</Text>
            </View>
          </View>
        </View>
        {isBodyTypeOn && (
          <Text style={{ fontSize: 13, color: 'red', alignSelf: 'center', marginTop: 1, }}>Select bodytype</Text>
        )}
        {/* </>
      ):null}
       */}
        <View style={{ width: "100%", alignItems: "center", marginTop: "5%" }}>
          <TouchableOpacity style={styles.filterbutton} onPress={handleSubmit}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Apply Filter</Text>
          </TouchableOpacity>
        </View>

      </View>
      {/* )}
     </Formik> */}
    </ScrollView>

  );
}
const styles = StyleSheet.create({

  active: {
    alignItems: "center",
    backgroundColor: "orange",
    padding: 10,
    marginLeft: "10%",
    width: "20%",
    borderRadius: 4,
    borderWidth: 0,
  },
  inactive: {
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    padding: 10,

    marginLeft: "10%",
    width: "20%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "orange"

  },
  filterbutton: {
    alignItems: "center",
    backgroundColor: "orange",
    padding: 10,
    marginBottom: "10%",
    width: "50%",
    borderRadius: 15,
    borderWidth: 0,

  },
  fontactive: {
    color: "white"
  },
  fontinactive: {
    color: "orange"
  }
});

export default FilterScreen;
