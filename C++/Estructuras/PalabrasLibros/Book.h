#pragma once
#include <iostream>
#include <map>
using namespace std;

class Book
{
private:
    string Title;
    map<string,int> Words;
public:
    Book(string Title);
    ~Book();
    void AddFrequencyOfWord(string Word,int Freq);
    bool VerifyIfFreqOfWordIsGreaterThanX(string Word,int X);
    string getTitle();
};
