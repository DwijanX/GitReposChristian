#pragma once
#include "Dict.h"
Dict::Dict()
{

}
Dict::~Dict()
{
}

void Dict::setLowerCaseWord(string& word)
{
    for(int i=0;i<word.size();i++)
    {
        word[i]=tolower(word[i]);
    }
}

void Dict::insertWord(string Word,string TranslatedWord,string ObjLanguage)
{
    setLowerCaseWord(Word);
    setLowerCaseWord(TranslatedWord);
    setLowerCaseWord(ObjLanguage);
    mainMap[Word][ObjLanguage]=TranslatedWord;
}
string Dict::searchTransalteOfAWordInXLanguage(string Word,string ObjLanguage)
{
    setLowerCaseWord(Word);
    setLowerCaseWord(ObjLanguage);
    string ans=mainMap[Word][ObjLanguage];
    if(ans=="")
    {
        ans="No se encontro la traduccion de la palabara";
    }
    return ans;
}
