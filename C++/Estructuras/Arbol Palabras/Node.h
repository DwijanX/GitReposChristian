#pragma once
#include <iostream>
#include <vector>
#define NWords 27
using namespace std;
template<class T>
class Node
{
private:
    pair<bool,Node<T>*>* Array;
public:
    Node();
    ~Node();
    void setTrueorFalseXPos(int pos,bool boolean);
    void addNodePointerToXPos(int pos, Node<T>* Node);
    bool getBoolOfXPos(int pos);
    Node<T>*& getNextNodeOfXPos(int pos);
    bool VerifyIfNodeCanBeDeleted();
};
template<class T>
Node<T>::Node()
{
    Array=new pair<bool,Node<T>*> [NWords];
}
template<class T>
Node<T>::~Node()
{
    delete [] Array;
}
template<class T>

void Node<T>::setTrueorFalseXPos(int pos,bool boolean)
{
    Array[pos].first=boolean;
}
template<class T>
void Node<T>::addNodePointerToXPos(int pos, Node<T>* Node)
{
    Array[pos].second=Node;
}
template<class T>

bool Node<T>::getBoolOfXPos(int pos)
{
    return Array[pos].first;
}
template<class T>
Node<T>*& Node<T>::getNextNodeOfXPos(int pos)
{
    return Array[pos].second;
}
template<class T>
bool Node<T>::VerifyIfNodeCanBeDeleted()
{
    bool ans=true;
    for(int i=0;i<NWords;i++)
    {
        if(Array[i].second!=NULL || Array[i].first)
        {
            ans=false;
            break;
        }
    }
    return ans;
}



