#pragma once
#include <iostream>
#include <map>
using namespace std;

class Dict
{
private:
    map<string,map<string,string>> mainMap;
    void setLowerCaseWord(string& word);
public:
    Dict();
    ~Dict();
    void insertWord(string Word,string TranslatedWord,string ObjLanguage);
    string searchTransalteOfAWordInXLanguage(string Word,string ObjLanguage);
};
