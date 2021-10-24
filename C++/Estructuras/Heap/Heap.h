#pragma once
#include <iostream>
#include "Node.h"

using namespace std;

template <class T>
class Heap
{
private:
    Node<T>** Array;
    int LastOne;
    void RecoverBottomTopProp(int Pos);
    void RecoverTopBottomProp(int Pos);
    void GoAcrossTreeInOrder(void (*FuncToDo)(T), int LocalRoot);
public:
    Heap(int ArrSize);
    ~Heap();
    void insert(T Data);
    T extractRoot();
    void ShowTree(void (*FuncToDo)(T));
    void ShowArray(void (*FuncToShow)(T));

};
template <class T>
Heap<T>::Heap(int ArrSize)
{
    Array=new Node<T>* [ArrSize];
    LastOne=-1;
}
template <class T>
Heap<T>::~Heap()
{
    delete [] Array;
}
template <class T>
void Heap<T>::RecoverBottomTopProp(int Pos)
{
    int FatherPos=Pos/2;
    if(FatherPos>=1)
    {
        if(Array[Pos]->getData()>Array[FatherPos]->getData())
        {
            swap(Array[Pos],Array[FatherPos]);
            RecoverBottomTopProp(FatherPos);
        }
    }
}
template <class T>
void Heap<T>::insert(T Data)
{
    if(LastOne==-1)
    {
      LastOne=1;
      Array[LastOne]=new Node<T>(Data,true);
    }
    else
    {
        LastOne++;
         Array[LastOne]=new Node<T>(Data,true);
        RecoverBottomTopProp(LastOne);
    }
    
}
template <class T>
T Heap<T>::extractRoot()
{
    T max;
    if(LastOne!=-1)
    {
        if(LastOne==1)
        {
            max=Array[LastOne]->getData();
            delete Array[LastOne];
            LastOne=-1;
        }
        else
        {
            max=Array[1]->getData();
            Array[1]->setData(Array[LastOne]->getData());
            delete Array[LastOne];
            LastOne--;
            RecoverTopBottomProp(1);
        }

    }
    return max;
}
template <class T>
void Heap<T>::RecoverTopBottomProp(int Pos)
{
    int MaxPos;
    if(Pos*2+1<=LastOne)
    {   
        if(Array[Pos*2]->getData()>Array[Pos*2+1]->getData())
        {
            MaxPos=Pos*2;
        }
        else
        {
            MaxPos=Pos*2+1;
        }
        if(Array[MaxPos]->getData()>Array[Pos]->getData())
        {
            swap(Array[MaxPos],Array[Pos]);
        }
        RecoverTopBottomProp(MaxPos);
    }
    if(Pos*2==LastOne)
    {
        if(Array[Pos*2]->getData()>Array[Pos]->getData())
        {
            swap(Array[Pos*2],Array[Pos]);
        }
        RecoverTopBottomProp(Pos*2);
    }
}
template <class T>
void Heap<T>::GoAcrossTreeInOrder(void (*FuncToDo)(T), int LocalRoot)
{
	if (LocalRoot <= LastOne)
	{
		GoAcrossTreeInOrder(FuncToDo, LocalRoot * 2);
		FuncToDo(Array[LocalRoot]->getData());
		GoAcrossTreeInOrder(FuncToDo,(LocalRoot * 2)+1);
	}
}
template <class T>
void Heap<T>::ShowTree(void (*FuncToDo)(T))
{
    GoAcrossTreeInOrder(FuncToDo,1);
}
template <class T>
void Heap<T>::ShowArray(void (*FuncToShow)(T))
{
    for(int i=1;i<=LastOne;i++)
    {
        FuncToShow(Array[i]->getData());
    }
}