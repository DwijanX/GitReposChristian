#include "Books.h"
Books::Books()
{}
Books::~Books()
{}
void Books::AddBook(string BookTittle)
{
    Book aux=Book(BookTittle);
    BooksList.push_back(aux);
}
void Books::AddWordsToBooksListFromFile(string BookTittle,string FileDirection)
{
    bool Found=false;
    list <Book> :: iterator it;
    for(it = BooksList.begin(); it != BooksList.end(); ++it)
    {
        if(it->getTitle()==BookTittle)
        {
            Found=true;
            break;
        }
    }
    if(!Found)
    {
        AddBook(BookTittle);
        it=BooksList.end();
        it--;
    }
    ifstream File;
    File.open(FileDirection);
    string aux;
    while(File>>aux)
    {
        it->AddFrequencyOfWord(aux,1);
    }
    File.close();
}
vector<string> Books::getBookTitlesThatHasMoreThanXTypeOfWords(string Word,int X)
{
    vector<string> ans;
    list <Book> :: iterator it;
    for(it = BooksList.begin(); it != BooksList.end(); ++it)
    {
        if(it->VerifyIfFreqOfWordIsGreaterThanX(Word,X))
        {
            ans.push_back(it->getTitle());
        }
    }
    return ans;
}