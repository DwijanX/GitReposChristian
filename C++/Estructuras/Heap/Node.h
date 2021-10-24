#pragma once
#include <iostream>
#include <Windows.h>
using namespace std;

template <class T>
class Node
{
private:
    T Data;
    bool ItExists;
public:
    Node(T Data1,bool ItExists);
    ~Node();
    T getData();
    bool getItExistst();
    void setItExists(bool Aux);
    void setData(T Data1);
    void show(void(*funcToShow)(T));
};
template <class T>
Node<T>::Node(T Data1,bool ItExists)
{
    Data=Data1;
    this->ItExists=ItExists;
}
template <class T>
Node<T>::~Node()
{

}
template <class T>
T Node<T>::getData()
{
    return Data;
}
template <class T>
bool Node<T>::getItExistst()
{
    return ItExists;
}
template <class T>
void Node<T>::setItExists(bool Aux)
{
    this->ItExists=Aux;
}
template <class T>
void Node<T>::setData(T Data1)
{
    Data=Data1;
}
template <class T>
void Node<T>::show(void(*funcToShow)(T))
{
    funcToShow(Data);
}