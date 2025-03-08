import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, CheckBox, Button } from 'react-native';
import React, { useState } from 'react';
// import CheckBox from '@react-native-community/checkbox';

export default function App() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [imgOutput, setImgOutput] = useState('');
  const [fileName, setfileName] = useState('');
  const [folderOutput, setFolderOutput] = useState('');
  const [isFile, setFile] = useState(false);
  const [isVideo, setVideo] = useState(false);
  const [prosACons, setProsACons] = useState(Array(8).fill(''))


  const showOutput = (text, title, isFile, prosACons) => {
    const fileType = isFile ? "file" : "Exe";
    const titleNoSpace = title.replace(/\s+/g, '')
    const media = isVideo ? `<video controls width="940" height="660" class="video-container">
                            <source src="${titleNoSpace}.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                            </video>` :
      `<img src="${titleNoSpace}\\${titleNoSpace}_img.png" alt="Image Description"></img>`
    const fileTypeString = isFile ? "txt" : "exe"
    
    var pros = ''
    for (let index = 0; index < 4; index++) {
      const element = prosACons[index];
      if (element != ''){
        pros += `<li>${element}</li>\n\t`
      }
    }
    var cons = ''
    for (let index = 4; index < 8; index++) {
      const element = prosACons[index];
      if (element != ''){
        cons += `<li>${element}</li>\n\t`
      }
    } 

    setFolderOutput(`${titleNoSpace}`)
    setImgOutput(`${titleNoSpace}_img.png`)
    setfileName(`${titleNoSpace}_${fileTypeString}.${fileTypeString}`)

    setOutput(
      `
      <!-- ${title} -->
      <div class="container">
      <h2 class="heading">${title}</h2>
      <div class="containerInner">
      <div class="image-content">
      ${media}
      </div>
      <div class="text-content">
      <p>${text}</p>
      <label for="pro">Pros</label>
      <ul id="pro">
      ${pros}</ul>
      <label for="con">Cons</label>
      <ul id="con">
      ${cons}</ul>
      <a href="${titleNoSpace}\\${titleNoSpace}_${fileTypeString}.${fileTypeString}" download class="download-btn">Download ${fileType}</a>
      </div>
      </div>
      </div>
      `
    )
  }

  const update = () => {
    showOutput(text, title, isFile, prosACons)
  }

  const handleProsConsChange = (index, value) => {
    const newProsACons = [...prosACons];
    newProsACons[index] = value;
    setProsACons(newProsACons);
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontal}>

        <TextInput
          style={[styles.input, styles.inputS]}
          placeholder="Enter the title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            update()
          }}
          multiline={true}
          textAlignVertical="top"
          numberOfLines={4}
        ></TextInput>

        <CheckBox
          style={styles.text}
          value={isFile}
          onValueChange={(newValue) => {
            setFile(newValue);
            update()
          }}
        />
        <Text style={styles.text}>Is a File</Text>

        <CheckBox
          style={styles.text}
          value={isVideo}
          onValueChange={(newValue) => {
            setVideo(newValue);
            update()
          }}
        />
        <Text style={styles.text}>Is a Video</Text>

        <Button
          title='Update'
          onPress={() => update()}
        ></Button>
      </View>
      <View style={styles.horizontal}>
        <View style={styles.vertical}>
          <TextInput
            style={[styles.input, styles.inputL]}
            placeholder="Enter the Web text"
            value={text}
            onChangeText={(text) => {
              setText(text);
              update();
            }}
            multiline={true}
            textAlignVertical="center"
          />

          <View style={styles.horizontal}>

            <View style={styles.vertical}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={`pro${index + 1}`}
                  style={[styles.input, styles.inputS]}
                  placeholder={`Pro ${index + 1}`}
                  value={prosACons[index]}
                  onChangeText={(text) => handleProsConsChange(index, text)}
                />
              ))}
            </View>

            <View style={styles.vertical}>
              {[4, 5, 6, 7].map((index) => (
                <TextInput
                  key={`con${index - 3}`}
                  style={[styles.input, styles.inputS]}
                  placeholder={`Con ${index - 3}`}
                  value={prosACons[index]}
                  onChangeText={(text) => handleProsConsChange(index, text)}
                />
              ))}
            </View>

          </View>

        </View>
        <View style={styles.vertical}>

          <View style={[styles.horizontal, styles.smallContainer]}>
            <Text style={styles.text}>
              Foler Path:
            </Text>
            <Text style={styles.text}>
              {folderOutput}
            </Text>
          </View>

          <View style={[styles.horizontal, styles.smallContainer]}>
            <Text style={styles.text}>
              Image Name:
            </Text>
            <Text style={styles.text}>
              {imgOutput}
            </Text>
          </View>

          <View style={[styles.horizontal, styles.smallContainer]}>
            <Text style={styles.text}>
              File Name:
            </Text>
            <Text style={styles.text}>
              {fileName}
            </Text>
          </View>

          <Text style={[styles.text, styles.flexWrap]}>
            {output}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallContainer: {
    borderWidth: 1
  },
  horizontal: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  vertical: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  input: {
    width: '60%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    //marginRight: 400,
    marginBottom: 10,
  },
  inputS: {
    height: 40,
  },
  inputL: {
    height: 300,
    flexWrap: 'wrap',
    textAlignVertical: 'top'
  },
  text: {
    margin: 10
  },
  flexWrap: {
    flexWrap: 'wrap',
    width: 500
  }
})
