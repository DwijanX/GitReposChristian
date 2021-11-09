#include "Book.h"

Book::Book(string Title)
{
    this->Title=Title;
}
Book::~Book()
{}
void Book::AddFrequencyOfWord(string Word,int Freq)
{
    Words[Word]+=Freq;
}
bool Book::VerifyIfFreqOfWordIsGreaterThanX(string Word,int X)
{
    bool ans;
    if(Words[Word]>X)
        ans= true;
    else
        ans= false;
    return ans;
}
string Book::getTitle()
{
    return Title;
}